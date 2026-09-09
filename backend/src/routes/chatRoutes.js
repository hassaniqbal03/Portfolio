const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { chatValidator } = require('../validators/chatValidator');
const validate = require('../middleware/validationMiddleware');
const { chatLimiter } = require('../middleware/rateLimiter');

router.post('/', chatLimiter, chatValidator, validate, chatController.handleChat);

module.exports = router;
