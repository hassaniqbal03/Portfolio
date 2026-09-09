const { body } = require('express-validator');

const experienceValidator = [
  body().custom((val, { req }) => {
    const title = req.body.job_title || req.body.jobTitle;
    if (!title || title.trim() === '') {
      throw new Error('Job title is required');
    }
    return true;
  }),
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ max: 150 }).withMessage('Company must not exceed 150 characters'),
  body().custom((val, { req }) => {
    const start = req.body.start_date || req.body.startDate;
    if (!start || String(start).trim() === '') {
      throw new Error('Start date is required');
    }
    return true;
  }),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
];

module.exports = {
  experienceValidator,
};
