import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor: Attach JWT token if available
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      if (!process.env.NEXT_PUBLIC_API_URL && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        config.baseURL = `http://${window.location.hostname}:5000/api`;
      }
      const token = localStorage.getItem('admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle common HTTP status codes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 && typeof window !== 'undefined') {
        // If unauthorized on admin routes, clear token
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          localStorage.removeItem('admin_token');
          window.location.href = '/admin/login?error=session_expired';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
