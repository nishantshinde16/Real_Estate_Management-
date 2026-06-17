import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createInvoice, deleteInvoice, downloadInvoice, getInvoices, saveBlob, updateInvoice } from '../../services/financeService';

const emptyForm = { invoiceNumber: '', customerName: '', email: '', property: '', amount: '', tax: '0', dueDate: '', status: 'Draft', notes: '' };
const statuses = ['Draft', 'Sent', 'Paid', 'Overdue'];

function InvoiceManagement() {
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const load = async () => setInvoices((await getInvoices()).data);
  useEffect(() => { load(); }, []);
  const updateField = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const save = async (event) => {
    event.preventDefault();
    const payload = { ...form, amount: Number(form.amount), tax: Number(form.tax) };
    editingId ? await updateInvoice(editingId, payload) : await createInvoice(payload);
    setEditingId('');
    setForm(emptyForm);
    load();
  };
  const edit = (invoice) => {
    setEditingId(invoice._id);
    setForm({ ...invoice, dueDate: invoice.dueDate?.slice(0, 10) || '' });
  };
  const download = async (invoice) => saveBlob((await downloadInvoice(invoice._id)).data, `${invoice.invoiceNumber}.pdf`);
  return (
    <section className="section lead-admin">
      <div className="section-heading"><div><p className="eyebrow">Admin Module</p><h1>Invoice Management</h1></div><Link className="btn-outline" to="/admin">Admin Home</Link></div>
      <div className="lead-workspace">
        <form className="admin-form" onSubmit={save}>
          <h2>{editingId ? 'Edit Invoice' : 'Generate Invoice'}</h2>
          <label>Invoice Number<input name="invoiceNumber" onChange={updateField} required value={form.invoiceNumber} /></label>
          <label>Customer Name<input name="customerName" onChange={updateField} required value={form.customerName} /></label>
          <label>Email<input name="email" onChange={updateField} type="email" value={form.email} /></label>
          <label>Property<input name="property" onChange={updateField} required value={form.property} /></label>
          <label>Amount<input min="0" name="amount" onChange={updateField} required type="number" value={form.amount} /></label>
          <label>Tax<input min="0" name="tax" onChange={updateField} type="number" value={form.tax} /></label>
          <label>Due Date<input name="dueDate" onChange={updateField} required type="date" value={form.dueDate} /></label>
          <label>Status<select name="status" onChange={updateField} value={form.status}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          <label>Notes<textarea name="notes" onChange={updateField} value={form.notes} /></label>
          <button className="btn" type="submit">{editingId ? 'Update Invoice' : 'Generate Invoice'}</button>
          {editingId && <button className="btn-outline" onClick={() => { setEditingId(''); setForm(emptyForm); }} type="button">Cancel</button>}
        </form>
        <div className="lead-list-panel"><div className="lead-table">
          {invoices.map((invoice) => (
            <article key={invoice._id}>
              <strong>{invoice.invoiceNumber} - {invoice.customerName}</strong><span>{invoice.property}</span><p>Rs. {invoice.amount + invoice.tax}</p>
              <span className="status-pill status-pending">{invoice.status}</span>
              <div className="actions"><button className="btn-outline" onClick={() => download(invoice)} type="button">Download PDF</button><button className="btn-outline" onClick={() => edit(invoice)} type="button">Edit</button><button className="btn-danger" onClick={async () => { await deleteInvoice(invoice._id); load(); }} type="button">Delete</button></div>
            </article>
          ))}
          {!invoices.length && <p className="empty-state">No invoices found.</p>}
        </div></div>
      </div>
    </section>
  );
}

export default InvoiceManagement;
