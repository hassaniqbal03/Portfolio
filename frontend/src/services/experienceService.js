import api from './api';
import { initialExperience } from '../data/mockData';

export const getExperience = async () => {
  try {
    const response = await api.get('/experience');
    return response.data;
  } catch (error) {
    console.warn('Express backend /api/experience not responding, using mock fallback');
    return initialExperience;
  }
};

export const createExperience = async (data) => {
  const response = await api.post('/experience', data);
  return response.data;
};

export const updateExperience = async (id, data) => {
  const response = await api.put(`/experience/${id}`, data);
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await api.delete(`/experience/${id}`);
  return response.data;
};
