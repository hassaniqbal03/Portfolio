import api from './api';
import { initialProjects } from '../data/mockData';

export const getProjects = async (category = null) => {
  try {
    const params = category && category !== 'All' ? { category } : {};
    const response = await api.get('/projects', { params });
    return response.data;
  } catch (error) {
    console.info('Express backend /api/projects error, returning empty list');
    return initialProjects;
  }
};

export const getProjectBySlug = async (slug) => {
  const response = await api.get(`/projects/${slug}`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};
