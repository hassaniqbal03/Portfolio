const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');
const { educationValidator } = require('../validators/educationValidator');
const validate = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public read
router.get('/', educationController.getEducation);
router.get('/:id', educationController.getEducationById);

// Admin-only write operations
router.post('/', authMiddleware, adminMiddleware, educationValidator, validate, educationController.createEducation);
router.put('/:id', authMiddleware, adminMiddleware, educationValidator, validate, educationController.updateEducation);
router.delete('/:id', authMiddleware, adminMiddleware, educationController.deleteEducation);

module.exports = router;
