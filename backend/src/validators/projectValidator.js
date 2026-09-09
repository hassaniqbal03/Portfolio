const { body } = require('express-validator');

const projectValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Project title is required')
    .isLength({ max: 200 }).withMessage('Title must not exceed 200 characters'),
  body('slug')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Slug must be URL-friendly (lowercase letters, numbers, hyphens)'),
  body('category')
    .optional()
    .trim(),
  body().custom((val, { req }) => {
    const desc = req.body.short_description || req.body.shortDescription;
    if (!desc || desc.trim() === '') {
      throw new Error('Short description is required');
    }
    return true;
  }),
  body().custom((val, { req }) => {
    const full = req.body.detailed_description || req.body.detailedDescription || req.body.fullDescription;
    if (!full || full.trim() === '') {
      throw new Error('Detailed description is required');
    }
    return true;
  }),
  body().custom((val, { req }) => {
    const img = req.body.image_url || req.body.imageUrl || req.body.image;
    if (!img || img.trim() === '') {
      throw new Error('Project image URL is required');
    }
    return true;
  }),
];

module.exports = {
  projectValidator,
};
