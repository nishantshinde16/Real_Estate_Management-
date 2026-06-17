const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const propertyApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/properties`);
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  },
  getById: async (id) => {
    const res = await fetch(`${API_URL}/properties/${id}`);
    if (!res.ok) throw new Error('Failed to fetch property');
    return res.json();
  },
  create: async (data) => {
    const res = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' /*, 'Authorization': `Bearer ${token}` */ },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create property');
    return res.json();
  },
  update: async (id, data) => {
    const res = await fetch(`${API_URL}/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update property');
    return res.json();
  },
  delete: async (id) => {
    const res = await fetch(`${API_URL}/properties/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete property');
    return res.json();
  }
};