const { sendError } = require('../utils/response');

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return sendError(res, 'Access denied. Administrator privileges required.', 403);
  }
  next();
};

module.exports = adminMiddleware;
