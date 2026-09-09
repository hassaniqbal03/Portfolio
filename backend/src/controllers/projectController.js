const projectService = require('../services/projectService');
const { sendError } = require('../utils/response');

const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const isFeatured = featured === 'true' ? true : (featured === 'false' ? false : null);
    const projects = await projectService.getAllProjects(category, isFeatured);
    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await projectService.getProjectBySlugOrId(slug);
    if (!project) {
      return sendError(res, `Project '${slug}' not found`, 404);
    }
    return res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const newProject = await projectService.createProject(req.body);
    return res.status(201).json({ ...newProject, success: true, message: 'Project created successfully' });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const updated = await projectService.updateProject(req.params.id, req.body);
    return res.status(200).json({ ...updated, success: true, message: 'Project updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    return res.status(200).json({ success: true, id: req.params.id, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
