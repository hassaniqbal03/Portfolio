const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactValidator } = require('../validators/contactValidator');
const validate = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public contact submission
router.post('/', contactValidator, validate, contactController.submitContact);

// Admin-only messages management
router.get('/', authMiddleware, adminMiddleware, contactController.getMessages);
router.get('/:id', authMiddleware, adminMiddleware, contactController.getMessageById);
router.patch('/:id/status', authMiddleware, adminMiddleware, contactController.updateMessageStatus);
router.delete('/:id', authMiddleware, adminMiddleware, contactController.deleteMessage);

module.exports = router;
