import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../../components/ui/PropertyCard';
import { getFeaturedProperties } from '../../services/propertyService';

function Home() {
  const [featured, setFeatured] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFeaturedProperties().then((res) => setFeatured(res.data)).catch(() => setFeatured([]));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/properties?search=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Real Estate Management</p>
          <h1>Find, manage, and inquire about premium properties.</h1>
          <form className="search-bar" onSubmit={handleSearch}>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by city, title, or area" />
            <button className="btn">Search</button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Featured Properties</h2>
          <Link to="/properties">View all</Link>
        </div>
        <div className="property-grid">
          {featured.map((property) => <PropertyCard key={property._id} property={property} />)}
        </div>
      </section>

      <section className="section split">
        <div>
          <h2>About EstatePro</h2>
          <p>EstatePro brings property listings, inquiries, saved homes, and admin controls into one clean MERN workspace.</p>
        </div>
        <div className="service-list">
          <span>Verified listings</span>
          <span>Inquiry tracking</span>
          <span>Admin property control</span>
          <span>Responsive search experience</span>
        </div>
      </section>

      <section className="section services">
        <h2>Services</h2>
        <div className="stats-grid">
          <div><strong>Buy</strong><p>Explore homes, plots, and commercial spaces.</p></div>
          <div><strong>Sell</strong><p>Manage property details and image uploads.</p></div>
          <div><strong>Consult</strong><p>Send inquiries directly to the team.</p></div>
        </div>
      </section>
    </>
  );
}

export default Home;
