import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProperty, getProperties } from '../../services/propertyService';
import { assetUrl, formatPrice } from '../../utils/format';

const categories = ['Apartment', 'Villa', 'House', 'Plot', 'Commercial'];

function PropertyListing() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ search: '', propertyType: '' });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadProperties = async () => {
    const response = await getProperties(filters);
    setProperties(response.data);
  };

  useEffect(() => {
    loadProperties();
  }, [filters.search, filters.propertyType]);

  const totals = useMemo(() => {
    return categories.reduce((summary, category) => {
      summary[category] = properties.filter((property) => property.propertyType === category).length;
      return summary;
    }, {});
  }, [properties]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteProperty(deleteTarget._id);
    setDeleteTarget(null);
    loadProperties();
  };

  return (
    <section className="section admin-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1>Property Listing</h1>
        </div>
        <div className="actions">
          <Link className="btn-outline" to="/admin">Dashboard</Link>
          <Link className="btn" to="/admin/properties/add">Add Property</Link>
        </div>
      </div>

      <div className="lead-stat-grid">
        <div><strong>{properties.length}</strong><span>Total Properties</span></div>
        {categories.slice(0, 4).map((category) => (
          <div key={category}><strong>{totals[category] || 0}</strong><span>{category}</span></div>
        ))}
      </div>

      <div className="admin-list-panel">
        <div className="lead-filters">
          <input aria-label="Search properties" onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} placeholder="Search by title, description, or location" type="search" value={filters.search} />
          <select aria-label="Filter by category" onChange={(event) => setFilters((current) => ({ ...current, propertyType: event.target.value }))} value={filters.propertyType}>
            <option value="">All Categories</option>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </div>

        <div className="property-table">
          <div className="property-table__head">
            <span>Property</span>
            <span>Category</span>
            <span>Price</span>
            <span>Rooms</span>
            <span>Actions</span>
          </div>
          {properties.map((property) => (
            <article key={property._id} className="property-table__row">
              <div className="property-table__property">
                <img alt={property.title} src={assetUrl(property.image)} />
                <div>
                  <strong>{property.title}</strong>
                  <span>{property.location}</span>
                </div>
              </div>
              <span className="badge">{property.propertyType}</span>
              <strong>{formatPrice(property.price)}</strong>
              <span>{property.bedrooms} Beds / {property.bathrooms} Baths</span>
              <div className="actions">
                <Link className="btn-outline" to={`/properties/${property._id}`}>View</Link>
                <Link className="btn-outline" to={`/admin/properties/${property._id}/edit`}>Edit</Link>
                <button className="btn-danger" onClick={() => setDeleteTarget(property)} type="button">Delete</button>
              </div>
            </article>
          ))}
          {!properties.length && <p className="empty-state">No properties found.</p>}
        </div>
      </div>

      {deleteTarget && (
        <div className="modal-backdrop" role="presentation">
          <div aria-modal="true" className="confirm-modal" role="dialog">
            <h2>Delete Property</h2>
            <p>Are you sure you want to delete {deleteTarget.title}? This action cannot be undone.</p>
            <div className="actions">
              <button className="btn-outline" onClick={() => setDeleteTarget(null)} type="button">Cancel</button>
              <button className="btn-danger" onClick={confirmDelete} type="button">Delete</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PropertyListing;
