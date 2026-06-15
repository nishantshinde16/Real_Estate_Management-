import { useNavigate } from 'react-router-dom';
import PropertyForm from '../../components/ui/PropertyForm';
import { createProperty } from '../../services/propertyService';

function AddProperty() {
  const navigate = useNavigate();

  const submit = async (payload) => {
    await createProperty(payload);
    navigate('/admin');
  };

  return (
    <section className="section">
      <h1>Add Property</h1>
      <PropertyForm onSubmit={submit} submitLabel="Add Property" />
    </section>
  );
}

export default AddProperty;
