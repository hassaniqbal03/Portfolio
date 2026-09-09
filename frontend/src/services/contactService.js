import api from './api';
import { initialMessages } from '../data/mockData';

export const sendContactMessage = async (data) => {
  const response = await api.post('/contact', data);
  return response.data;
};

export const getMessages = async () => {
  try {
    const response = await api.get('/messages');
    return response.data;
  } catch (error) {
    console.info('Express backend /api/messages not responding, returning empty messages');
    return initialMessages;
  }
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/messages/${id}`);
  return response.data;
};
