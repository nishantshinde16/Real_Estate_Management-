import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/ui/PropertyCard';
import { getFeaturedProperties } from '../../services/propertyService';
import img1 from "../../assets/img1.webp" ;
import img2 from "../../assets/img2.webp";
import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";

const heroImages = [
  img1,
  img2,
  img3,
  img4,
];

const starterProperties = [
  {
    _id: 'starter-skyline',
    title: 'Skyline Heights Apartment',
    location: 'Mumbai, Maharashtra',
    propertyType: 'Apartment',
    price: 85000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'starter-greenfield',
    title: 'Greenfield Family Villa',
    location: 'Pune, Maharashtra',
    propertyType: 'Villa',
    price: 145000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'starter-central',
    title: 'Central Business Office',
    location: 'Bengaluru, Karnataka',
    propertyType: 'Commercial',
    price: 210000,
    bedrooms: 0,
    bathrooms: 3,
    area: 4800,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  },
];

const categories = [
  { name: 'Apartments', count: '42 listings' },
  { name: 'Luxury Villas', count: '18 listings' },
  { name: 'Commercial Offices', count: '27 listings' },
  { name: 'Studio Homes', count: '15 listings' },
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [featured, setFeatured] = useState(starterProperties);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    price: '',
  });

  useEffect(() => {
    getFeaturedProperties()
      .then((res) => {
        setFeatured(res.data?.length ? res.data : starterProperties);
      })
      .catch(() => setFeatured(starterProperties));
  }, []);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 8000);

  return () => clearInterval(interval);
}, []);

  const filteredProperties = useMemo(() => {
    return featured.filter((property) => {
      const locationMatch = property.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      const typeMatch = filters.propertyType
        ? property.propertyType === filters.propertyType
        : true;
      const priceMatch = filters.price
        ? Number(property.price) <= Number(filters.price)
        : true;

      return locationMatch && typeMatch && priceMatch;
    });
  }, [featured, filters]);

  const updateFilter = (event) => {
    const { name, value } = event.target;
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }));
  };

  return (
    <>
    <section className="home-hero">
  {heroImages.map((image, index) => (
    <div
      key={index}
      className={`hero-slide ${index === currentImage ? "active" : ""}`}
      style={{
        backgroundImage: `linear-gradient(rgba(10,24,38,0.6), rgba(10,24,38,0.4)), url(${image})`,
      }}
    />
  ))}

  

        <div className="home-hero__content">
          <p className="eyebrow">Premium Property Management</p>
          <h1>Find, manage, and showcase properties with confidence.</h1>
          <p>
            Discover verified homes, villas, and commercial spaces with a modern
            dashboard built for property teams and growing portfolios.
          </p>
          <Link className="primary-button" to="/properties">Explore Properties</Link>
        </div>
      </section>

      <div className="page-shell">
        <section className="search-section" aria-label="Search properties">
          <label>
            Location
            <input
              name="location"
              onChange={updateFilter}
              placeholder="City or state"
              type="search"
              value={filters.location}
            />
          </label>

          <label>
            Category
            <select name="propertyType" onChange={updateFilter} value={filters.propertyType}>
              <option value="">All Categories</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Commercial">Commercial</option>
              <option value="House">House</option>
              <option value="Plot">Plot</option>
            </select>
          </label>

          <label>
            Max Price
            <select name="price" onChange={updateFilter} value={filters.price}>
              <option value="">Any Budget</option>
              <option value="90000">Under Rs. 90,000</option>
              <option value="150000">Under Rs. 1,50,000</option>
              <option value="250000">Under Rs. 2,50,000</option>
            </select>
          </label>
        </section>

        <section className="home-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured</p>
              <h2>Featured Properties</h2>
            </div>
            <Link to="/properties">View all</Link>
          </div>

          {filteredProperties.length === 0 ? (
            <p className="empty-state">No properties match your search.</p>
          ) : (
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </section>

        <section className="home-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Categories</p>
              <h2>Browse by Property Type</h2>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.name}>
                <h3>{category.name}</h3>
                <p>{category.count}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
