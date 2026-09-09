const { loginAdmin, getAdminById } = require('../services/authService');
const { getCookieOptions } = require('../utils/jwt');
const { sendSuccess, sendError } = require('../utils/response');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authResult = await loginAdmin(email, password);

    if (!authResult) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Set secure HTTP-only cookie
    res.cookie('token', authResult.token, getCookieOptions());

    return sendSuccess(res, authResult, 'Logged in successfully');
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('token', getCookieOptions());
  return sendSuccess(res, null, 'Logged out successfully');
};

const me = async (req, res, next) => {
  try {
    const admin = await getAdminById(req.user.id);
    if (!admin) {
      return sendError(res, 'User session not found', 404);
    }
    return sendSuccess(res, admin, 'Current user profile');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  me,
};
