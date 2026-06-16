import api from './api';

export const createBooking = (payload) => api.post('/bookings', payload);
export const getBookings = (params) => api.get('/bookings', { params });
export const getBooking = (id) => api.get(`/bookings/${id}`);
export const updateBookingStatus = (id, status) => api.patch(`/bookings/${id}/status`, { status });
export const getMyBookings = () => api.get('/bookings/my');
