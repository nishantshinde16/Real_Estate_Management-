import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createReceipt, deleteReceipt, downloadReceipt, getReceipts, saveBlob } from '../../services/financeService';

const emptyForm = { receiptNumber: '', customerName: '', property: '', amount: '', paymentMode: 'UPI', transactionId: '', receivedDate: '', notes: '' };

function ReceiptManagement() {
  const [receipts, setReceipts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const load = async () => setReceipts((await getReceipts()).data);
  useEffect(() => { load(); }, []);
  const updateField = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const save = async (event) => {
    event.preventDefault();
    await createReceipt({ ...form, amount: Number(form.amount) });
    setForm(emptyForm);
    load();
  };
  const download = async (receipt) => saveBlob((await downloadReceipt(receipt._id)).data, `${receipt.receiptNumber}.pdf`);
  return (
    <section className="section lead-admin">
      <div className="section-heading"><div><p className="eyebrow">Admin Module</p><h1>Receipt Management</h1></div><Link className="btn-outline" to="/admin">Admin Home</Link></div>
      <div className="lead-workspace">
        <form className="admin-form" onSubmit={save}>
          <h2>Generate Receipt</h2>
          <label>Receipt Number<input name="receiptNumber" onChange={updateField} required value={form.receiptNumber} /></label>
          <label>Customer Name<input name="customerName" onChange={updateField} required value={form.customerName} /></label>
          <label>Property<input name="property" onChange={updateField} required value={form.property} /></label>
          <label>Amount<input min="0" name="amount" onChange={updateField} required type="number" value={form.amount} /></label>
          <label>Payment Mode<input name="paymentMode" onChange={updateField} required value={form.paymentMode} /></label>
          <label>Transaction ID<input name="transactionId" onChange={updateField} value={form.transactionId} /></label>
          <label>Received Date<input name="receivedDate" onChange={updateField} required type="date" value={form.receivedDate} /></label>
          <label>Notes<textarea name="notes" onChange={updateField} value={form.notes} /></label>
          <button className="btn" type="submit">Generate Receipt</button>
        </form>
        <div className="lead-list-panel"><div className="lead-table">
          {receipts.map((receipt) => (
            <article key={receipt._id}>
              <strong>{receipt.receiptNumber} - {receipt.customerName}</strong><span>{receipt.property}</span><p>Rs. {receipt.amount} via {receipt.paymentMode}</p>
              <div className="actions"><button className="btn-outline" onClick={() => download(receipt)} type="button">Download Receipt</button><button className="btn-danger" onClick={async () => { await deleteReceipt(receipt._id); load(); }} type="button">Delete</button></div>
            </article>
          ))}
          {!receipts.length && <p className="empty-state">No receipts found.</p>}
        </div></div>
      </div>
    </section>
  );
}

export default ReceiptManagement;
