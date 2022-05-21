require('dotenv/config');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/api/users/sign-up', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }

  argon2.hash(password)
    .then(hashedPassword => {
      const sql = `insert into "users"
      ("email", "hashedPassword")
      values ($1, $2)
      returning *`;
      const params = [email, hashedPassword];
      db.query(sql, params)
        .then(result => {
          res.status(201).json({
            userId: result.rows[0].userId,
            email: result.rows[0].email,
            createdAt: result.rows[0].createdAt
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/users/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "email" = $1
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.delete('/api/transactions/:transactionId', (req, res) => {
  const id = Number(req.params.transactionId);
  if (!id || !Number.isInteger(id)) {
    res.status(400).json({ error: 'Invalid Id' });
    return;
  }
  const sql = `
  delete from "transactions"
  where "transactionId" = $1
  returning *
  `;
  const values = [id];
  db.query(sql, values)
    .then(result => {
      const transaction = result.rows[0];
      if (!transaction) {
        res.status(404).json({ error: 'transactionId does not exist' });
        return;
      }
      res.status(204).json(transaction);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.use(authorizationMiddleware);

app.get('/api/transactions', (req, res) => {
  const { userId } = req.user;

  const sql = `
    select
      "transactionId",
      "amount",
      "type",
      "category",
      "categoryId",
      to_char("date", 'MM/DD/YYYY') as "date"
      from "transactions"
      join "categories" using ("categoryId")
      where "userId" = $1
      order by date desc
  `;
  const params = [userId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/categories', (req, res) => {
  const sql = `
    select *
      from "categories"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/users', (req, res) => {
  const { userId } = req.user;

  const sql = `
    select *
      from "users"
      join "transactions" using ("userId")
    where "userId" = $1
  `;

  const params = [userId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/transactions', (req, res) => {
  const body = req.body;
  const { userId } = req.user;

  if (!body.amount || !body.type || !body.categoryId || !body.date) {
    res.status(400).json({
      error: 'Entry must contain "Amount", "Type"'
    });
    return;
  }
  const categorySQL = `
    select "category" from "categories"
    where "categoryId" = $1;
  `;
  const categoryParams = [body.categoryId];

  // Query to get category information
  db.query(categorySQL, categoryParams)
    .then(categoryResult => {
      const [category] = categoryResult.rows;

      if (!category) {
        return res.status(400).json({ error: 'Invalid category ID provided' });
      }

      const sql = `
        insert into "transactions" ("amount", "type", "categoryId", "userId", "date")
        values ($1, $2, $3, $4, $5)
        returning "transactionId", "amount", "type", "categoryId", to_char("date", 'MM/DD/YYYY') as "date"
      `;
      const params = [body.amount, body.type, body.categoryId, userId, body.date];

      db.query(sql, params)
        .then(result => {
          const [transaction] = result.rows;
          transaction.category = category.category;
          res.status(201).json(transaction);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: 'an unexpected error occurred'
          });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
