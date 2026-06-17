import api from './api';

export const createContactMessage = (payload) => api.post('/contact-messages', payload);
export const getContactMessages = () => api.get('/contact-messages');

export const createCustomerInquiry = (payload) => api.post('/customer-inquiries', payload);
export const getCustomerInquiries = () => api.get('/customer-inquiries');

export const createPayment = (payload) => api.post('/payments', payload);
export const getPayments = () => api.get('/payments');
export const updatePayment = (id, payload) => api.put(`/payments/${id}`, payload);
export const deletePayment = (id) => api.delete(`/payments/${id}`);

export const createInvoice = (payload) => api.post('/invoices', payload);
export const getInvoices = () => api.get('/invoices');
export const updateInvoice = (id, payload) => api.put(`/invoices/${id}`, payload);
export const deleteInvoice = (id) => api.delete(`/invoices/${id}`);
export const downloadInvoice = (id) => api.get(`/invoices/${id}/download`, { responseType: 'blob' });

export const createInstallment = (payload) => api.post('/installments', payload);
export const getInstallments = () => api.get('/installments');
export const updateInstallment = (id, payload) => api.put(`/installments/${id}`, payload);
export const deleteInstallment = (id) => api.delete(`/installments/${id}`);

export const createReceipt = (payload) => api.post('/receipts', payload);
export const getReceipts = () => api.get('/receipts');
export const deleteReceipt = (id) => api.delete(`/receipts/${id}`);
export const downloadReceipt = (id) => api.get(`/receipts/${id}/download`, { responseType: 'blob' });

export const saveBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};
