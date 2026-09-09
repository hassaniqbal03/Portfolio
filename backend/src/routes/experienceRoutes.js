const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const { experienceValidator } = require('../validators/experienceValidator');
const validate = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public read
router.get('/', experienceController.getExperience);
router.get('/:id', experienceController.getExperienceById);

// Admin-only write operations
router.post('/', authMiddleware, adminMiddleware, experienceValidator, validate, experienceController.createExperience);
router.put('/:id', authMiddleware, adminMiddleware, experienceValidator, validate, experienceController.updateExperience);
router.delete('/:id', authMiddleware, adminMiddleware, experienceController.deleteExperience);

module.exports = router;
