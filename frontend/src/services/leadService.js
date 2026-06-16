import api from './api';

export const createLead = (payload) => api.post('/leads', payload);
export const getLeads = (params) => api.get('/leads', { params });
export const getLead = (id) => api.get(`/leads/${id}`);
export const updateLead = (id, payload) => api.put(`/leads/${id}`, payload);
export const deleteLead = (id) => api.delete(`/leads/${id}`);
export const addFollowUp = (id, payload) => api.post(`/leads/${id}/follow-ups`, payload);
