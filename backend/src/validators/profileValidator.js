const { body } = require('express-validator');

const updateProfileValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 }).withMessage('Name must be between 2 and 150 characters'),
  body('professional_title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 }).withMessage('Professional title must be between 2 and 200 characters'),
  body('short_bio')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Short bio must not exceed 500 characters'),
  body('full_bio')
    .optional()
    .trim(),
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
];

module.exports = {
  updateProfileValidator,
};
