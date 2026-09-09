import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const token = response.data?.token || response.data?.data?.token;
    const user = response.data?.user || response.data?.data?.user;
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(user || { email: credentials.email }));
    }
    return response.data;
  } catch (error) {
    // For demo/development without Express backend running:
    // Support admin test login credentials
    if (credentials.email === 'admin@portfolio.dev' && credentials.password === 'admin123') {
      const mockToken = 'mock-jwt-token-hassan-portfolio-admin';
      const mockUser = { name: 'Muhammad Hassan Iqbal', email: credentials.email, role: 'Administrator' };
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', mockToken);
        localStorage.setItem('admin_user', JSON.stringify(mockUser));
      }
      return { success: true, token: mockToken, user: mockUser, isMock: true };
    }
    throw error.response?.data?.message || error.message || 'Authentication failed';
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (err) {
    // ignore
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.dispatchEvent(new Event('portfolio_data_updated'));
      window.dispatchEvent(new Event('storage'));
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data?.data || response.data;
  } catch (error) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('admin_user');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('admin_token');
};
