import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createInquiry } from '../../services/inquiryService';
import { getProperty, toggleSavedProperty } from '../../services/propertyService';
import { assetUrl, formatPrice } from '../../utils/format';

function PropertyDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    getProperty(id).then((res) => setProperty(res.data));
  }, [id]);

  const sendInquiry = async (event) => {
    event.preventDefault();
    await createInquiry({ propertyId: id, name: user?.name, email: user?.email, message });
    setMessage('');
    setStatus('Inquiry sent successfully');
  };

  if (!property) return <section className="section">Loading property...</section>;

  return (
    <section className="section details">
      <img src={assetUrl(property.image)} alt={property.title} />
      <div>
        <span className="badge">{property.propertyType}</span>
        <h1>{property.title}</h1>
        <p>{property.description}</p>
        <h2>{formatPrice(property.price)}</h2>
        <div className="meta">
          <span>{property.location}</span>
          <span>{property.bedrooms} Bedrooms</span>
          <span>{property.bathrooms} Bathrooms</span>
          <span>{property.area} sq ft</span>
        </div>
        {user && <button className="btn btn-outline" onClick={() => toggleSavedProperty(id)}>Save Property</button>}
        <form className="inquiry-form" onSubmit={sendInquiry}>
          <h3>Send Inquiry</h3>
          {status && <p className="success">{status}</p>}
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your inquiry" required />
          <button className="btn">Send Inquiry</button>
        </form>
      </div>
    </section>
  );
}

export default PropertyDetails;
