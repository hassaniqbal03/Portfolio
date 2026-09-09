const experienceService = require('../services/experienceService');
const { sendError } = require('../utils/response');

const getExperience = async (req, res, next) => {
  try {
    const list = await experienceService.getAllExperience();
    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const getExperienceById = async (req, res, next) => {
  try {
    const item = await experienceService.getExperienceById(req.params.id);
    if (!item) {
      return sendError(res, 'Experience record not found', 404);
    }
    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const created = await experienceService.createExperience(req.body);
    return res.status(201).json({ ...created, success: true, message: 'Experience record created' });
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const updated = await experienceService.updateExperience(req.params.id, req.body);
    return res.status(200).json({ ...updated, success: true, message: 'Experience record updated' });
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    await experienceService.deleteExperience(req.params.id);
    return res.status(200).json({ success: true, id: req.params.id, message: 'Experience record deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
