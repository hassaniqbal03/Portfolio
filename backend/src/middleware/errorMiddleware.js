const env = require('../config/env');
const logger = require('../utils/logger');
const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
  const message = env.NODE_ENV === 'production' && statusCode === 500
    ? 'An unexpected server error occurred. Please try again later.'
    : err.message || 'Internal Server Error';

  return sendError(res, message, statusCode, err.errors || null);
};

const notFoundHandler = (req, res) => {
  return sendError(res, `API route '${req.originalUrl}' was not found on this server.`, 404);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
