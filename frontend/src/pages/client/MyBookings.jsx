import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings } from '../../services/bookingService';
import { formatPrice } from '../../utils/format';

const steps = ['Pending', 'Approved', 'Completed'];

const stepState = (booking, step) => {
  if (booking.status === 'Rejected') return step === 'Pending' ? 'done' : 'blocked';
  return steps.indexOf(step) <= steps.indexOf(booking.status) ? 'done' : '';
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBookings().then((response) => setBookings(response.data));
  }, []);

  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Client Portal</p>
          <h1>My Bookings</h1>
        </div>
        <Link className="btn-outline" to="/properties">Book Another Property</Link>
      </div>

      <div className="history-list booking-history">
        {bookings.map((booking) => (
          <article key={booking._id}>
            <div className="section-heading booking-card-heading">
              <div>
                <strong>{booking.propertyId?.title || 'Property Booking'}</strong>
                <span>{booking.propertyId?.location}</span>
              </div>
              <span className={`status-pill status-${booking.status.toLowerCase()}`}>{booking.status}</span>
            </div>
            <p>{formatPrice(booking.bookingAmount)} via {booking.paymentMode}</p>
            <div className="progress-tracker">
              {steps.map((step) => (
                <span className={stepState(booking, step)} key={step}>{step}</span>
              ))}
              {booking.status === 'Rejected' && <span className="blocked">Rejected</span>}
            </div>
          </article>
        ))}
        {!bookings.length && <p className="empty-state">You have not created any bookings yet.</p>}
      </div>
    </section>
  );
}

export default MyBookings;
