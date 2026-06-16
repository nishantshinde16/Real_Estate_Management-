import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBooking } from '../../services/bookingService';
import { formatPrice } from '../../utils/format';

function BookingConfirmation() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    getBooking(id).then((response) => setBooking(response.data));
  }, [id]);

  if (!booking) return <section className="section">Loading booking...</section>;

  return (
    <section className="section confirmation-page">
      <div className="booking-summary">
        <p className="eyebrow">Booking Created</p>
        <h1>Booking Confirmation</h1>
        <p>Your booking request has been submitted and is waiting for admin approval.</p>
        <div className="booking-meta">
          <span>Booking ID: {booking._id}</span>
          <span>Status: {booking.status}</span>
          <span>Amount: {formatPrice(booking.bookingAmount)}</span>
          <span>Property: {booking.propertyId?.title}</span>
        </div>
        <div className="actions">
          <Link className="btn" to="/my-bookings">Track Booking</Link>
          <Link className="btn-outline" to="/properties">Browse Properties</Link>
        </div>
      </div>
    </section>
  );
}

export default BookingConfirmation;
