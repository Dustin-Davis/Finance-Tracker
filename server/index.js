require('dotenv/config');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/transactions', (req, res) => {
  const sql = `
    select *
      from "transactions"
     order by "transactionId"
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

app.post('/api/transactions', (req, res) => {
  const body = req.body;
  const userId = 1;
  if (!body.amount || !body.type || !body.categoryId || !body.date) {
    res.status(400).json({
      error: 'Entry must contain "Amount", "Type"'
    });
    return;
  }
  const sql = `
    insert into "transactions" ("amount", "type", "categoryId", "userId", "date")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [body.amount, body.type, body.categoryId, userId, body.date];
  db.query(sql, params)
    .then(result => {
      const [transactions] = result.rows;
      res.status(201).json(transactions);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
