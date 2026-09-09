const educationService = require('../services/educationService');
const { sendError } = require('../utils/response');

const getEducation = async (req, res, next) => {
  try {
    const list = await educationService.getAllEducation();
    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const getEducationById = async (req, res, next) => {
  try {
    const item = await educationService.getEducationById(req.params.id);
    if (!item) {
      return sendError(res, 'Education record not found', 404);
    }
    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

const createEducation = async (req, res, next) => {
  try {
    const created = await educationService.createEducation(req.body);
    return res.status(201).json({ ...created, success: true, message: 'Education record created' });
  } catch (error) {
    next(error);
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const updated = await educationService.updateEducation(req.params.id, req.body);
    return res.status(200).json({ ...updated, success: true, message: 'Education record updated' });
  } catch (error) {
    next(error);
  }
};

const deleteEducation = async (req, res, next) => {
  try {
    await educationService.deleteEducation(req.params.id);
    return res.status(200).json({ success: true, id: req.params.id, message: 'Education record deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
