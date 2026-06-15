import { useState } from 'react';

const initialState = {
  title: '',
  description: '',
  location: '',
  price: '',
  propertyType: 'Apartment',
  bedrooms: 1,
  bathrooms: 1,
  area: '',
};

function PropertyForm({ initialValues = {}, onSubmit, submitLabel = 'Save Property' }) {
  const [form, setForm] = useState({ ...initialState, ...initialValues });
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (image) payload.append('image', image);
    onSubmit(payload);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <input name="title" placeholder="Property title" value={form.title} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
      <select name="propertyType" value={form.propertyType} onChange={handleChange}>
        <option>Apartment</option>
        <option>Villa</option>
        <option>House</option>
        <option>Plot</option>
        <option>Commercial</option>
      </select>
      <input name="bedrooms" type="number" min="0" placeholder="Bedrooms" value={form.bedrooms} onChange={handleChange} />
      <input name="bathrooms" type="number" min="0" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} />
      <input name="area" type="number" placeholder="Area in sq ft" value={form.area} onChange={handleChange} required />
      <input type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0])} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <button className="btn" type="submit">{submitLabel}</button>
    </form>
  );
}

export default PropertyForm;
