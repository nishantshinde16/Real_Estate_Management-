import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBookings, updateBookingStatus } from '../../services/bookingService';
import { formatPrice } from '../../utils/format';

const statuses = ['Pending', 'Approved', 'Rejected', 'Completed'];

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '' });

  const loadBookings = async () => {
    const response = await getBookings(filters);
    setBookings(response.data);
  };

  useEffect(() => {
    loadBookings();
  }, [filters.search, filters.status]);

  const totals = useMemo(() => {
    return statuses.reduce((summary, status) => {
      summary[status] = bookings.filter((booking) => booking.status === status).length;
      return summary;
    }, {});
  }, [bookings]);

  const changeStatus = async (id, status) => {
    await updateBookingStatus(id, status);
    loadBookings();
  };

  return (
    <section className="section lead-admin">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Booking Management</p>
          <h1>Booking Approval Workflow</h1>
        </div>
        <Link className="btn-outline" to="/admin">Admin Home</Link>
      </div>

      <div className="lead-stat-grid">
        {statuses.map((status) => (
          <div key={status}>
            <strong>{totals[status] || 0}</strong>
            <span>{status}</span>
          </div>
        ))}
      </div>

      <div className="lead-list-panel booking-admin-panel">
        <div className="lead-filters">
          <input aria-label="Search bookings" onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} placeholder="Search bookings" type="search" value={filters.search} />
          <select aria-label="Filter by status" onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} value={filters.status}>
            <option value="">All Statuses</option>
            {statuses.map((status) => <option key={status}>{status}</option>)}
          </select>
        </div>

        <div className="lead-table">
          {bookings.map((booking) => (
            <article key={booking._id}>
              <div>
                <strong>{booking.customerName}</strong>
                <span>{booking.email}</span>
                <span>{booking.mobile}</span>
              </div>
              <span className={`status-pill status-${booking.status.toLowerCase()}`}>{booking.status}</span>
              <p>{booking.propertyId?.title || 'Property'} - {booking.propertyId?.location}</p>
              <p>{formatPrice(booking.bookingAmount)} via {booking.paymentMode}</p>
              <p>{booking.notes || 'No notes added'}</p>
              <div className="actions">
                {statuses.map((status) => (
                  <button className="btn-outline" disabled={booking.status === status} key={status} onClick={() => changeStatus(booking._id, status)} type="button">{status}</button>
                ))}
              </div>
            </article>
          ))}
          {!bookings.length && <p className="empty-state">No bookings found.</p>}
        </div>
      </div>
    </section>
  );
}

export default BookingManagement;
