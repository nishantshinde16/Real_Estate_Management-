import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createBooking } from '../../services/bookingService';
import { getProperty } from '../../services/propertyService';
import { formatPrice } from '../../utils/format';

const emptyForm = {
  customerName: '',
  email: '',
  mobile: '',
  address: '',
  bookingAmount: '',
  paymentMode: 'Online Transfer',
  notes: '',
};

function BookingPage() {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [form, setForm] = useState({
    ...emptyForm,
    customerName: user?.name || '',
    email: user?.email || '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (propertyId) {
      getProperty(propertyId).then((response) => setProperty(response.data));
    }
  }, [propertyId]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await createBooking({
        ...form,
        propertyId,
        bookingAmount: Number(form.bookingAmount),
      });
      navigate(`/booking-confirmation/${response.data._id}`);
    } catch (bookingError) {
      setError(bookingError.response?.data?.message || 'Unable to create booking');
    }
  };

  return (
    <section className="section booking-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Property Booking</p>
          <h1>Book Your Property</h1>
        </div>
      </div>

      <div className="booking-workspace">
        <form className="admin-form" onSubmit={submitBooking}>
          {error && <p className="error">{error}</p>}
          <label>Customer Name<input name="customerName" onChange={updateField} required value={form.customerName} /></label>
          <label>Email<input name="email" onChange={updateField} required type="email" value={form.email} /></label>
          <label>Mobile<input name="mobile" onChange={updateField} required value={form.mobile} /></label>
          <label>Address<textarea name="address" onChange={updateField} required value={form.address} /></label>
          <label>Booking Amount<input min="0" name="bookingAmount" onChange={updateField} required type="number" value={form.bookingAmount} /></label>
          <label>Payment Mode<select name="paymentMode" onChange={updateField} value={form.paymentMode}>
            <option>Online Transfer</option>
            <option>Cheque</option>
            <option>Cash</option>
            <option>Card</option>
          </select></label>
          <label>Notes<textarea name="notes" onChange={updateField} value={form.notes} /></label>
          <button className="btn" type="submit">Submit Booking</button>
        </form>

        <aside className="booking-summary">
          <h2>Booking Summary</h2>
          {property ? (
            <>
              <strong>{property.title}</strong>
              <span>{property.location}</span>
              <span>{property.propertyType}</span>
              <p>{formatPrice(property.price)}</p>
            </>
          ) : (
            <p>Select a property before creating a booking.</p>
          )}
        </aside>
      </div>
    </section>
  );
}

export default BookingPage;
