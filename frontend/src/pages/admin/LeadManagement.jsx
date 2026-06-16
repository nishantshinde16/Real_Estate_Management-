import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createLead, deleteLead, getLeads, updateLead } from '../../services/leadService';

const statuses = ['New', 'Contacted', 'Follow-Up', 'Converted'];
const emptyLead = { fullName: '', email: '', phoneNumber: '', message: '', status: 'New' };

function LeadManagement() {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '' });
  const [form, setForm] = useState(emptyLead);
  const [editingId, setEditingId] = useState('');

  const loadLeads = async () => {
    const response = await getLeads(filters);
    setLeads(response.data);
  };

  useEffect(() => {
    loadLeads();
  }, [filters.search, filters.status]);

  const totals = useMemo(() => {
    return statuses.reduce((summary, status) => {
      summary[status] = leads.filter((lead) => lead.status === status).length;
      return summary;
    }, {});
  }, [leads]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveLead = async (event) => {
    event.preventDefault();
    if (editingId) {
      await updateLead(editingId, form);
    } else {
      await createLead(form);
    }
    setForm(emptyLead);
    setEditingId('');
    loadLeads();
  };

  const editLead = (lead) => {
    setEditingId(lead._id);
    setForm({
      fullName: lead.fullName,
      email: lead.email,
      phoneNumber: lead.phoneNumber,
      message: lead.message,
      status: lead.status,
    });
  };

  const removeLead = async (id) => {
    await deleteLead(id);
    loadLeads();
  };

  return (
    <section className="section lead-admin">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Customer Leads Section</p>
          <h1>Lead Management Dashboard</h1>
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

      <div className="lead-workspace">
        <form className="admin-form" onSubmit={saveLead}>
          <h2>{editingId ? 'Edit Lead' : 'Add Lead'}</h2>
          <label>Full Name<input name="fullName" onChange={updateField} required value={form.fullName} /></label>
          <label>Email<input name="email" onChange={updateField} required type="email" value={form.email} /></label>
          <label>Phone Number<input name="phoneNumber" onChange={updateField} required value={form.phoneNumber} /></label>
          <label>Status<select name="status" onChange={updateField} value={form.status}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          <label>Message<textarea name="message" onChange={updateField} required value={form.message} /></label>
          <button className="btn" type="submit">{editingId ? 'Update Lead' : 'Add Lead'}</button>
          {editingId && <button className="btn-outline" onClick={() => { setEditingId(''); setForm(emptyLead); }} type="button">Cancel Edit</button>}
        </form>

        <div className="lead-list-panel">
          <div className="lead-filters">
            <input aria-label="Search leads" onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} placeholder="Search leads" type="search" value={filters.search} />
            <select aria-label="Filter by status" onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} value={filters.status}>
              <option value="">All Statuses</option>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>

          <div className="lead-table">
            {leads.map((lead) => (
              <article key={lead._id}>
                <div>
                  <strong>{lead.fullName}</strong>
                  <span>{lead.email}</span>
                  <span>{lead.phoneNumber}</span>
                </div>
                <span className={`status-pill status-${lead.status.toLowerCase().replace('-', '')}`}>{lead.status}</span>
                <p>{lead.message}</p>
                <div className="actions">
                  <Link className="btn-outline" to={`/admin/leads/${lead._id}`}>Customer Details</Link>
                  <button className="btn-outline" onClick={() => editLead(lead)} type="button">Edit</button>
                  <button className="btn-danger" onClick={() => removeLead(lead._id)} type="button">Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeadManagement;
