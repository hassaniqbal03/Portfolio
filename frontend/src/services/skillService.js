import api from './api';
import { initialSkills } from '../data/mockData';

export const getSkills = async () => {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    console.warn('Express backend /api/skills not responding, using mock fallback');
    return initialSkills;
  }
};

export const createSkill = async (skillData) => {
  const response = await api.post('/skills', skillData);
  return response.data;
};

export const updateSkill = async (id, skillData) => {
  const response = await api.put(`/skills/${id}`, skillData);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await api.delete(`/skills/${id}`);
  return response.data;
};
