const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginValidator } = require('../validators/authValidator');
const validate = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, loginValidator, validate, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, adminMiddleware, authController.me);

module.exports = router;
