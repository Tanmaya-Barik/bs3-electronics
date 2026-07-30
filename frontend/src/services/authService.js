import api from './api';

const signup = async (name, email, password) => {
  const response = await api.post('/auth/signup', { name, email, password });
  if (response.data && response.data.token) {
    localStorage.setItem('bs3_userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data && response.data.token) {
    localStorage.setItem('bs3_userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('bs3_userInfo');
};

const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

const getAllUsers = async () => {
  const response = await api.get('/auth/users');
  return response.data;
};

export default {
  signup,
  login,
  logout,
  getProfile,
  getAllUsers
};

