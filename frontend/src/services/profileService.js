import api from './api';
import { initialProfile, initialStats, initialAboutFeatures } from '../data/mockData';

export const getProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_profile');
      if (saved) {
        try {
          return {
            profile: JSON.parse(saved),
            stats: initialStats,
            aboutFeatures: initialAboutFeatures,
            isMock: true,
          };
        } catch (e) {
          // ignore
        }
      }
    }
    return {
      profile: initialProfile,
      stats: initialStats,
      aboutFeatures: initialAboutFeatures,
      isMock: true,
    };
  }
};

export const updateProfile = async (profileData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_profile', JSON.stringify(profileData));
    window.dispatchEvent(new Event('portfolio_data_updated'));
  }
  try {
    const response = await api.put('/profile', profileData);
    return response.data;
  } catch (error) {
    return { success: true, profile: profileData, message: 'Profile updated successfully!' };
  }
};
