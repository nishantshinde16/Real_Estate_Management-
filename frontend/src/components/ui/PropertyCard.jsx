import { Link } from 'react-router-dom';
import { assetUrl, formatPrice } from '../../utils/format';

function PropertyCard({ property, onDelete }) {
  return (
    <article className="property-card">
      <img src={assetUrl(property.image)} alt={property.title} />
      <div className="property-card__body">
        <span className="badge">{property.propertyType}</span>
        <h3>{property.title}</h3>
        <p>{property.location}</p>
        <strong>{formatPrice(property.price)}</strong>
        <div className="meta">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.area} sq ft</span>
        </div>
        <div className="actions">
          <Link className="btn btn-outline" to={`/properties/${property._id}`}>View</Link>
          <Link className="btn" to={`/bookings?propertyId=${property._id}`}>Book</Link>
          {onDelete && <button className="btn btn-danger" onClick={() => onDelete(property._id)}>Delete</button>}
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
