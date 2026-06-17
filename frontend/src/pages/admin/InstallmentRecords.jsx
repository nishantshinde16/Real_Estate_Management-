import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createInstallment, deleteInstallment, getInstallments, updateInstallment } from '../../services/financeService';

const emptyForm = { customerName: '', property: '', installmentNo: '1', amount: '', dueDate: '', paidDate: '', status: 'Pending', notes: '' };
const statuses = ['Pending', 'Paid', 'Overdue'];

function InstallmentRecords() {
  const [installments, setInstallments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const load = async () => setInstallments((await getInstallments()).data);
  useEffect(() => { load(); }, []);
  const updateField = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const save = async (event) => {
    event.preventDefault();
    const payload = { ...form, amount: Number(form.amount), installmentNo: Number(form.installmentNo), paidDate: form.paidDate || undefined };
    editingId ? await updateInstallment(editingId, payload) : await createInstallment(payload);
    setEditingId('');
    setForm(emptyForm);
    load();
  };
  const edit = (installment) => {
    setEditingId(installment._id);
    setForm({ ...installment, dueDate: installment.dueDate?.slice(0, 10) || '', paidDate: installment.paidDate?.slice(0, 10) || '' });
  };
  return (
    <section className="section lead-admin">
      <div className="section-heading"><div><p className="eyebrow">Admin Module</p><h1>Installment Records</h1></div><Link className="btn-outline" to="/admin">Admin Home</Link></div>
      <div className="lead-workspace">
        <form className="admin-form" onSubmit={save}>
          <h2>{editingId ? 'Edit Installment' : 'Add Installment'}</h2>
          <label>Customer Name<input name="customerName" onChange={updateField} required value={form.customerName} /></label>
          <label>Property<input name="property" onChange={updateField} required value={form.property} /></label>
          <label>Installment No<input min="1" name="installmentNo" onChange={updateField} required type="number" value={form.installmentNo} /></label>
          <label>Amount<input min="0" name="amount" onChange={updateField} required type="number" value={form.amount} /></label>
          <label>Due Date<input name="dueDate" onChange={updateField} required type="date" value={form.dueDate} /></label>
          <label>Paid Date<input name="paidDate" onChange={updateField} type="date" value={form.paidDate} /></label>
          <label>Status<select name="status" onChange={updateField} value={form.status}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          <label>Notes<textarea name="notes" onChange={updateField} value={form.notes} /></label>
          <button className="btn" type="submit">{editingId ? 'Update Installment' : 'Create Installment'}</button>
          {editingId && <button className="btn-outline" onClick={() => { setEditingId(''); setForm(emptyForm); }} type="button">Cancel</button>}
        </form>
        <div className="lead-list-panel"><div className="lead-table">
          {installments.map((installment) => (
            <article key={installment._id}>
              <strong>{installment.customerName} - #{installment.installmentNo}</strong><span>{installment.property}</span><p>Rs. {installment.amount}</p>
              <span className="status-pill status-pending">{installment.status}</span>
              <div className="actions"><button className="btn-outline" onClick={() => edit(installment)} type="button">Edit</button><button className="btn-danger" onClick={async () => { await deleteInstallment(installment._id); load(); }} type="button">Delete</button></div>
            </article>
          ))}
          {!installments.length && <p className="empty-state">No installments found.</p>}
        </div></div>
      </div>
    </section>
  );
}

export default InstallmentRecords;
