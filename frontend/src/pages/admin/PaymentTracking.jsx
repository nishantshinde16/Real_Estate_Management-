import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPayment, deletePayment, getPayments, updatePayment } from '../../services/financeService';

const emptyForm = { customerName: '', property: '', amount: '', paymentMode: 'UPI', transactionId: '', paymentDate: '', status: 'Pending', notes: '' };
const statuses = ['Pending', 'Paid', 'Failed', 'Refunded'];

function PaymentTracking() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');

  const load = async () => setPayments((await getPayments()).data);

  useEffect(() => { load(); }, []);

  const updateField = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));

  const save = async (event) => {
    event.preventDefault();
    const payload = { ...form, amount: Number(form.amount) };
    editingId ? await updatePayment(editingId, payload) : await createPayment(payload);
    setEditingId('');
    setForm(emptyForm);
    load();
  };

  const edit = (payment) => {
    setEditingId(payment._id);
    setForm({ ...payment, paymentDate: payment.paymentDate?.slice(0, 10) || '' });
  };

  return (
    <section className="section lead-admin">
      <div className="section-heading">
        <div><p className="eyebrow">Admin Module</p><h1>Payment Tracking</h1></div>
        <Link className="btn-outline" to="/admin">Admin Home</Link>
      </div>
      <div className="lead-workspace">
        <form className="admin-form" onSubmit={save}>
          <h2>{editingId ? 'Edit Payment' : 'Add Payment'}</h2>
          <label>Customer Name<input name="customerName" onChange={updateField} required value={form.customerName} /></label>
          <label>Property<input name="property" onChange={updateField} required value={form.property} /></label>
          <label>Amount<input min="0" name="amount" onChange={updateField} required type="number" value={form.amount} /></label>
          <label>Payment Mode<input name="paymentMode" onChange={updateField} required value={form.paymentMode} /></label>
          <label>Transaction ID<input name="transactionId" onChange={updateField} value={form.transactionId} /></label>
          <label>Payment Date<input name="paymentDate" onChange={updateField} required type="date" value={form.paymentDate} /></label>
          <label>Status<select name="status" onChange={updateField} value={form.status}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          <label>Notes<textarea name="notes" onChange={updateField} value={form.notes} /></label>
          <button className="btn" type="submit">{editingId ? 'Update Payment' : 'Create Payment'}</button>
          {editingId && <button className="btn-outline" onClick={() => { setEditingId(''); setForm(emptyForm); }} type="button">Cancel</button>}
        </form>
        <div className="lead-list-panel"><div className="lead-table">
          {payments.map((payment) => (
            <article key={payment._id}>
              <strong>{payment.customerName}</strong><span>{payment.property}</span>
              <p>Rs. {payment.amount} via {payment.paymentMode}</p>
              <span className="status-pill status-pending">{payment.status}</span>
              <div className="actions"><button className="btn-outline" onClick={() => edit(payment)} type="button">Edit</button><button className="btn-danger" onClick={async () => { await deletePayment(payment._id); load(); }} type="button">Delete</button></div>
            </article>
          ))}
          {!payments.length && <p className="empty-state">No payments found.</p>}
        </div></div>
      </div>
    </section>
  );
}

export default PaymentTracking;
