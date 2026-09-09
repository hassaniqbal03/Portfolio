const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { skillValidator } = require('../validators/skillValidator');
const validate = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public read
router.get('/', skillController.getSkills);
router.get('/:id', skillController.getSkillById);

// Admin-only write operations
router.post('/', authMiddleware, adminMiddleware, skillValidator, validate, skillController.createSkill);
router.put('/:id', authMiddleware, adminMiddleware, skillValidator, validate, skillController.updateSkill);
router.delete('/:id', authMiddleware, adminMiddleware, skillController.deleteSkill);

module.exports = router;
