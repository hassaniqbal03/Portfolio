const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');

const authMiddleware = (req, res, next) => {
  let token = null;

  // 1. Check HTTP-only cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2. Fallback to Authorization: Bearer <token>
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Authentication required. Please log in.', 401);
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return sendError(res, 'Invalid or expired authentication session. Please log in again.', 401);
  }

  req.user = decoded;
  next();
};

module.exports = authMiddleware;
