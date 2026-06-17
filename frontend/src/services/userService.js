import api from './api';

export const getDashboard = () => api.get('/users/dashboard');
export const getUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
export const updateUserRole = (id, role) => api.patch(`/users/${id}/role`, { role });
export const getAdminStats = () => api.get('/users/admin/stats');
export const getRoles = () => api.get('/users/roles');
export const createRole = (data) => api.post('/users/roles', data);
export const updateRolePermissions = (id, permissions) => api.patch(`/users/roles/${id}/permissions`, { permissions });
