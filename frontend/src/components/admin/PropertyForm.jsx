/* eslint-disable react-hooks/set-state-in-effect */
'use client'; // Required if using Next.js App Router. Safe to keep for standard React too.

import  { useState, useEffect } from 'react';

export default function PropertyForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    location: '',
    address: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    amenities: '',
    images: '',
    status: 'Available',
    agentName: '',
    agentPhone: '',
    agentEmail: ''
  });

  // Populate form if editing an existing property
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || '',
        price: initialData.price || '',
        location: initialData.location || '',
        address: initialData.address || '',
        area: initialData.area || '',
        bedrooms: initialData.bedrooms || '',
        bathrooms: initialData.bathrooms || '',
        description: initialData.description || '',
        amenities: initialData.amenities ? initialData.amenities.join(', ') : '',
        images: initialData.images ? initialData.images.join(', ') : '',
        status: initialData.status || 'Available',
        agentName: initialData.agentInfo?.name || '',
        agentPhone: initialData.agentInfo?.phone || '',
        agentEmail: initialData.agentInfo?.email || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert comma-separated strings back to arrays for the backend
    const payload = {
      ...formData,
      amenities: formData.amenities.split(',').map((a) => a.trim()).filter(Boolean),
      images: formData.images.split(',').map((i) => i.trim()).filter(Boolean),
      agentInfo: {
        name: formData.agentName,
        phone: formData.agentPhone,
        email: formData.agentEmail,
      },
    };

    // Remove helper fields before sending to API
    delete payload.agentName;
    delete payload.agentPhone;
    delete payload.agentEmail;

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      {/* --- Basic Information --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2" // REPLACE with your existing input class/component
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
        </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price ($) *</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
      </div>

      {/* --- Location & Address --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Location (City/Area) *</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full Address *</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
      </div>

      {/* --- Property Details --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Area (Sq.ft) *</label>
          <input
            name="area"
            type="number"
            value={formData.area}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms *</label>
          <input
            name="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bathrooms *</label>
          <input
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
      </div>

      {/* --- Description & Media --- */}
      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amenities (comma separated)</label>
          <input
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="e.g., Pool, Gym, Parking"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URLs (comma separated)</label>
          <input
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="e.g., /img1.jpg, /img2.jpg"
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* --- Agent Information --- */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold mb-3">Agent / Owner Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Agent Name</label>
            <input
              name="agentName"
              value={formData.agentName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Agent Phone</label>
            <input
              name="agentPhone"
              value={formData.agentPhone}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Agent Email</label>
            <input
              name="agentEmail"
              type="email"
              value={formData.agentEmail}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100" // REPLACE with your existing cancel button class
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" // REPLACE with your existing primary button class
        >
          {initialData ? 'Update Property' : 'Add Property'}
        </button>
      </div>
    </form>
  );
}