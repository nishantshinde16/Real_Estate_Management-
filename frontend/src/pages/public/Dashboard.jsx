import useFetch from '../../hooks/useFetch';
import { getDashboard } from '../../services/userService';
import PropertyCard from '../../components/ui/PropertyCard';

function Dashboard() {
  const { data, loading } = useFetch(getDashboard, []);

  if (loading) return <section className="section">Loading dashboard...</section>;

  return (
    <section className="section">
      <h1>User Dashboard</h1>
      <div className="stats-grid">
        <div><strong>{data.user.name}</strong><p>{data.user.email}</p><p>Role: {data.user.role}</p></div>
        <div><strong>{data.user.savedProperties.length}</strong><p>Saved Properties</p></div>
        <div><strong>{data.inquiries.length}</strong><p>Inquiry History</p></div>
      </div>
      <h2>Saved Properties</h2>
      <div className="property-grid">
        {data.user.savedProperties.map((property) => <PropertyCard key={property._id} property={property} />)}
      </div>
      <h2>Property Inquiry History</h2>
      <div className="table-list">
        {data.inquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <strong>{inquiry.propertyId?.title || 'General inquiry'}</strong>
            <p>{inquiry.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
