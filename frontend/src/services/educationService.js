import api from './api';
import { initialEducation } from '../data/mockData';

export const getEducation = async () => {
  try {
    const response = await api.get('/education');
    return response.data;
  } catch (error) {
    console.info('Express backend /api/education error, returning empty list');
    return initialEducation;
  }
};

export const createEducation = async (data) => {
  const response = await api.post('/education', data);
  return response.data;
};

export const updateEducation = async (id, data) => {
  const response = await api.put(`/education/${id}`, data);
  return response.data;
};

export const deleteEducation = async (id) => {
  const response = await api.delete(`/education/${id}`);
  return response.data;
};
