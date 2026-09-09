const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { projectValidator } = require('../validators/projectValidator');
const validate = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public read
router.get('/', projectController.getProjects);
router.get('/:slug', projectController.getProjectBySlug);

// Admin-only write operations
router.post('/', authMiddleware, adminMiddleware, projectValidator, validate, projectController.createProject);
router.put('/:id', authMiddleware, adminMiddleware, projectValidator, validate, projectController.updateProject);
router.delete('/:id', authMiddleware, adminMiddleware, projectController.deleteProject);

module.exports = router;
