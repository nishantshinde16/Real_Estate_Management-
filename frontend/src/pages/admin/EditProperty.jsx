import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropertyForm from '../../components/ui/PropertyForm';
import { getProperty, updateProperty } from '../../services/propertyService';

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getProperty(id)
      .then((response) => setProperty(response.data))
      .catch(() => setError('Property could not be loaded.'));
  }, [id]);

  const initialValues = useMemo(() => property || {}, [property]);

  const submit = async (payload) => {
    await updateProperty(id, payload);
    navigate('/admin/properties');
  };

  return (
    <section className="section admin-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1>Edit Property</h1>
        </div>
        <Link className="btn-outline" to="/admin/properties">Back to Listing</Link>
      </div>
      {error && <p className="error">{error}</p>}
      {property ? <PropertyForm initialValues={initialValues} isEdit onSubmit={submit} submitLabel="Update Property" /> : !error && <p className="empty-state">Loading property...</p>}
    </section>
  );
}

export default EditProperty;
