import api from './api';

export const getDashboard = () => api.get('/users/dashboard');
export const getUsers = () => api.get('/users');
export const getAdminStats = () => api.get('/users/admin/stats');
