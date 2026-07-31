import axios from 'axios';

// Automatically connect to live Render backend on production or use VITE_API_URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bs3-electronics.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor to add JWT token if logged in
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('bs3_userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      if (parsedUser && parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
