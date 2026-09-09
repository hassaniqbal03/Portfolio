const skillService = require('../services/skillService');
const { sendError } = require('../utils/response');

const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    const skills = await skillService.getAllSkills(category);
    return res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};

const getSkillById = async (req, res, next) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);
    if (!skill) {
      return sendError(res, 'Skill not found', 404);
    }
    return res.status(200).json(skill);
  } catch (error) {
    next(error);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const newSkill = await skillService.createSkill(req.body);
    return res.status(201).json({ ...newSkill, success: true, message: 'Skill created successfully' });
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const updated = await skillService.updateSkill(req.params.id, req.body);
    return res.status(200).json({ ...updated, success: true, message: 'Skill updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    await skillService.deleteSkill(req.params.id);
    return res.status(200).json({ success: true, id: req.params.id, message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
