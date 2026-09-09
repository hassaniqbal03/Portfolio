const { body } = require('express-validator');

const skillValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Skill name is required')
    .isLength({ max: 100 }).withMessage('Skill name must not exceed 100 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isLength({ max: 50 }).withMessage('Category must not exceed 50 characters'),
  body('proficiency')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Proficiency must be an integer between 1 and 100'),
  body('display_order')
    .optional()
    .isInt({ min: 0 }).withMessage('Display order must be a positive integer'),
];

module.exports = {
  skillValidator,
};
