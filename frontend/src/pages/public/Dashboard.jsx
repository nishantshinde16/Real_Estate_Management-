import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/ui/PropertyCard';
import { getMyBookings } from '../../services/bookingService';
import { getMyPayments } from '../../services/financeService';
import { getDashboard } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/format';

const allows = (permissions, names) => names.some((name) => permissions.includes(name));

const bookingTotals = (bookings) => ({
  pending: bookings.filter((booking) => booking.status === 'Pending').length,
  approved: bookings.filter((booking) => booking.status === 'Approved').length,
  completed: bookings.filter((booking) => booking.status === 'Completed').length,
});

function Dashboard() {
  const { setUser } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    Promise.all([getDashboard(), getMyBookings(), getMyPayments()])
      .then(([dashboardRes, bookingsRes, paymentsRes]) => {
        if (!active) return;
        setDashboard(dashboardRes.data);
        localStorage.setItem('user', JSON.stringify(dashboardRes.data.user));
        setUser(dashboardRes.data.user);
        setBookings(bookingsRes.data);
        setPayments(paymentsRes.data);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  const permissions = dashboard?.user?.permissions || [];
  const canViewSaved = allows(permissions, ['Browse Properties', 'Properties']);
  const canViewBookings = allows(permissions, ['My Bookings', 'Bookings']);
  const canCreateBookings = allows(permissions, ['Create Bookings', 'Bookings']);
  const canViewInquiries = allows(permissions, ['Inquiries']);
  const canViewPayments = allows(permissions, ['Payments', 'Finance']);
  const totals = useMemo(() => bookingTotals(bookings), [bookings]);
  const paidTotal = payments
    .filter((payment) => payment.status === 'Paid')
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  if (loading) return <section className="section">Loading dashboard...</section>;
  if (!dashboard) return <section className="section">Dashboard is unavailable.</section>;

  return (
    <section className="user-dashboard">
      <div className="user-hero">
        <div>
          <p className="eyebrow">Client Portal</p>
          <h1>Welcome back, {dashboard.user.name}</h1>
          <p>Track your property activity, booking progress, payment history, and inquiries from one private workspace.</p>
          <div className="user-permission-list">
            {permissions.map((permission) => <span key={permission}>{permission}</span>)}
            {!permissions.length && <span>No permissions assigned</span>}
          </div>
        </div>
        <div className="user-profile-card">
          <strong>{dashboard.user.name}</strong>
          <span>{dashboard.user.email}</span>
          <small>{dashboard.user.role}</small>
        </div>
      </div>

      <div className="user-stat-grid">
        {canViewBookings && <div><span>Total Bookings</span><strong>{bookings.length}</strong><small>{totals.pending} pending approval</small></div>}
        {canViewBookings && <div><span>Approved</span><strong>{totals.approved}</strong><small>{totals.completed} completed</small></div>}
        {canViewPayments && <div><span>Paid Amount</span><strong>{formatPrice(paidTotal)}</strong><small>{payments.length} payment records</small></div>}
        {canViewSaved && <div><span>Saved Properties</span><strong>{dashboard.user.savedProperties.length}</strong><small>Shortlisted homes</small></div>}
        {canViewInquiries && <div><span>Inquiries</span><strong>{dashboard.inquiries.length}</strong><small>Property conversations</small></div>}
      </div>

      <div className="user-action-strip">
        {canCreateBookings && <Link className="btn" to="/properties">Book Property</Link>}
        {canViewBookings && <Link className="btn-outline" to="/my-bookings">My Bookings</Link>}
        {canViewInquiries && <Link className="btn-outline" to="/inquiry">New Inquiry</Link>}
      </div>

      <div className="user-dashboard-grid">
        {canViewBookings && (
          <section>
            <div className="user-panel-heading">
              <h2>Recent Bookings</h2>
              <Link to="/my-bookings">View all</Link>
            </div>
            <div className="user-record-list">
              {bookings.slice(0, 4).map((booking) => (
                <article key={booking._id}>
                  <div>
                    <strong>{booking.propertyId?.title || 'Property Booking'}</strong>
                    <span>{booking.propertyId?.location || booking.email}</span>
                  </div>
                  <span className={`status-pill status-${booking.status.toLowerCase()}`}>{booking.status}</span>
                  <small>{formatPrice(booking.bookingAmount)} via {booking.paymentMode}</small>
                </article>
              ))}
              {!bookings.length && <p className="empty-state">No bookings yet.</p>}
            </div>
          </section>
        )}

        {canViewPayments && (
          <section>
            <div className="user-panel-heading">
              <h2>Payment History</h2>
            </div>
            <div className="user-record-list">
              {payments.slice(0, 5).map((payment) => (
                <article key={payment._id}>
                  <div>
                    <strong>{payment.property}</strong>
                    <span>{payment.transactionId || payment.paymentMode}</span>
                  </div>
                  <span className={`status-pill status-${payment.status.toLowerCase()}`}>{payment.status}</span>
                  <small>{formatPrice(payment.amount)}</small>
                </article>
              ))}
              {!payments.length && <p className="empty-state">No payment records found.</p>}
            </div>
          </section>
        )}

        {canViewInquiries && (
          <section>
            <div className="user-panel-heading">
              <h2>Property Inquiry History</h2>
              <Link to="/inquiry">Ask again</Link>
            </div>
            <div className="user-record-list">
              {dashboard.inquiries.slice(0, 5).map((inquiry) => (
                <article key={inquiry._id}>
                  <div>
                    <strong>{inquiry.propertyId?.title || 'General inquiry'}</strong>
                    <span>{inquiry.propertyId?.location || 'UrbanNest team'}</span>
                  </div>
                  <small>{inquiry.message}</small>
                </article>
              ))}
              {!dashboard.inquiries.length && <p className="empty-state">No inquiries yet.</p>}
            </div>
          </section>
        )}

        {canViewSaved && (
          <section className="user-saved-panel">
            <div className="user-panel-heading">
              <h2>Saved Properties</h2>
              <Link to="/properties">Explore</Link>
            </div>
            <div className="property-grid">
              {dashboard.user.savedProperties.map((property) => <PropertyCard key={property._id} property={property} />)}
            </div>
            {!dashboard.user.savedProperties.length && <p className="empty-state">No saved properties yet.</p>}
          </section>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
