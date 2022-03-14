const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {
  const { 'x-access-token': xAccessToken } = req.headers;
  if (!xAccessToken) {
    throw new ClientError(401, 'authentication required');
  }
  try {
    req.user = jwt.verify(xAccessToken, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    throw new ClientError(401, 'authentication required');

  }

}

module.exports = authorizationMiddleware;
