import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/ui/PropertyCard';
import { getAllInquiries } from '../../services/inquiryService';
import { deleteProperty, getProperties } from '../../services/propertyService';
import { getAdminStats, getUsers } from '../../services/userService';

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, properties: 0, inquiries: 0 });
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const load = async () => {
    const [statsRes, usersRes, propertiesRes, inquiriesRes] = await Promise.all([
      getAdminStats(),
      getUsers(),
      getProperties(),
      getAllInquiries(),
    ]);
    setStats(statsRes.data);
    setUsers(usersRes.data);
    setProperties(propertiesRes.data);
    setInquiries(inquiriesRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const removeProperty = async (id) => {
    await deleteProperty(id);
    load();
  };

  return (
    <section className="section">
      <div className="section-heading">
        <h1>Admin Dashboard</h1>
        <Link className="btn" to="/admin/properties/add">Add Property</Link>
      </div>
      <div className="stats-grid">
        <div><strong>{stats.users}</strong><p>Users</p></div>
        <div><strong>{stats.properties}</strong><p>Properties</p></div>
        <div><strong>{stats.inquiries}</strong><p>Inquiries</p></div>
      </div>
      <h2>Manage Properties</h2>
      <div className="property-grid">
        {properties.map((property) => <PropertyCard key={property._id} property={property} onDelete={removeProperty} />)}
      </div>
      <h2>Manage Users</h2>
      <div className="table-list">
        {users.map((user) => <div key={user._id}><strong>{user.name}</strong><span>{user.email}</span><span>{user.role}</span></div>)}
      </div>
      <h2>View Inquiries</h2>
      <div className="table-list">
        {inquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <strong>{inquiry.name || inquiry.userId?.name || 'Visitor'}</strong>
            <span>{inquiry.propertyId?.title || 'General Contact'}</span>
            <p>{inquiry.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminDashboard;
