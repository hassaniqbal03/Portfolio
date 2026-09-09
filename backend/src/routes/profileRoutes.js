const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { updateProfileValidator } = require('../validators/profileValidator');
const validate = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', profileController.getPublicProfile);
router.put('/', authMiddleware, adminMiddleware, updateProfileValidator, validate, profileController.updateAdminProfile);

module.exports = router;
