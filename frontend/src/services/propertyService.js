import api from './api';

export const getProperties = (params) => api.get('/properties', { params });
export const getFeaturedProperties = () => api.get('/properties/featured');
export const getProperty = (id) => api.get(`/properties/${id}`);
export const createProperty = (payload) => api.post('/properties', payload);
export const updateProperty = (id, payload) => api.put(`/properties/${id}`, payload);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);
export const toggleSavedProperty = (id) => api.post(`/properties/${id}/save`);
