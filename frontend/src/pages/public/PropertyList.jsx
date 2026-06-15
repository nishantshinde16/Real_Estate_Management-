import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../../components/ui/PropertyCard';
import { getProperties } from '../../services/propertyService';

function PropertyList() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({ search: searchParams.get('search') || '', location: '', minPrice: '', maxPrice: '', propertyType: '', bedrooms: '' });
  const [properties, setProperties] = useState([]);

  const loadProperties = () => {
    getProperties(filters).then((res) => setProperties(res.data)).catch(() => setProperties([]));
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const update = (event) => setFilters({ ...filters, [event.target.name]: event.target.value });

  return (
    <section className="section">
      <div className="section-heading">
        <h1>Property Listing</h1>
        <p>{properties.length} properties found</p>
      </div>
      <form className="filters" onSubmit={(event) => { event.preventDefault(); loadProperties(); }}>
        <input name="search" placeholder="Search" value={filters.search} onChange={update} />
        <input name="location" placeholder="Location" value={filters.location} onChange={update} />
        <input name="minPrice" type="number" placeholder="Min price" value={filters.minPrice} onChange={update} />
        <input name="maxPrice" type="number" placeholder="Max price" value={filters.maxPrice} onChange={update} />
        <select name="propertyType" value={filters.propertyType} onChange={update}>
          <option value="">All types</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>House</option>
          <option>Plot</option>
          <option>Commercial</option>
        </select>
        <input name="bedrooms" type="number" placeholder="Bedrooms" value={filters.bedrooms} onChange={update} />
        <button className="btn">Apply</button>
      </form>
      <div className="property-grid">
        {properties.map((property) => <PropertyCard key={property._id} property={property} />)}
      </div>
    </section>
  );
}

export default PropertyList;
