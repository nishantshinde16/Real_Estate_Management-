import api from './api';

export const createInquiry = (payload) => api.post('/inquiries', payload);
export const getMyInquiries = () => api.get('/inquiries/mine');
export const getAllInquiries = () => api.get('/inquiries');
