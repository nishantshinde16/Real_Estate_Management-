import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/ui/PropertyCard';
import { getBookings } from '../../services/bookingService';
import { getAllInquiries } from '../../services/inquiryService';
import { getLeads } from '../../services/leadService';
import { deleteProperty, getProperties } from '../../services/propertyService';
import { getAdminStats, getUsers } from '../../services/userService';

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, properties: 0, inquiries: 0 });
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [leads, setLeads] = useState([]);
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const [statsRes, usersRes, propertiesRes, inquiriesRes, leadsRes, bookingsRes] = await Promise.all([
      getAdminStats(),
      getUsers(),
      getProperties(),
      getAllInquiries(),
      getLeads(),
      getBookings(),
    ]);
    setStats(statsRes.data);
    setUsers(usersRes.data);
    setProperties(propertiesRes.data);
    setInquiries(inquiriesRes.data);
    setLeads(leadsRes.data);
    setBookings(bookingsRes.data);
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
        <div className="actions">
          <Link className="btn-outline" to="/admin/leads">Manage Leads</Link>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            <Link className="btn-outline" to="/admin/feedbacks">
    Manage Feedbacks
  </Link>
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          <Link className="btn-outline" to="/admin/bookings">Manage Bookings</Link>
          <Link className="btn" to="/admin/properties/add">Add Property</Link>
        </div>
      </div>
      <div className="stats-grid">
        <div><strong>{stats.users}</strong><p>Users</p></div>
        <div><strong>{stats.properties}</strong><p>Properties</p></div>
        <div><strong>{stats.inquiries}</strong><p>Inquiries</p></div>
        <div><strong>{leads.length}</strong><p>Customer Leads</p></div>
        <div><strong>{bookings.length}</strong><p>Bookings</p></div>
      </div>
      <h2>Booking History</h2>
      <div className="table-list">
        {bookings.slice(0, 4).map((booking) => (
          <div key={booking._id}>
            <strong>{booking.customerName}</strong>
            <span>{booking.propertyId?.title || 'Property'}</span>
            <span className={`status-pill status-${booking.status.toLowerCase()}`}>{booking.status}</span>
          </div>
        ))}
      </div>
      <h2>Lead Status Tracking</h2>
      <div className="table-list">
        {leads.slice(0, 4).map((lead) => (
          <div key={lead._id}>
            <strong>{lead.fullName}</strong>
            <span>{lead.email}</span>
            <span className={`status-pill status-${lead.status.toLowerCase().replace('-', '')}`}>{lead.status}</span>
          </div>
        ))}
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
