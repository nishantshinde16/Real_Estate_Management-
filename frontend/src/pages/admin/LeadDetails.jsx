import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addFollowUp, getLead, updateLead } from '../../services/leadService';

const statuses = ['New', 'Contacted', 'Follow-Up', 'Converted'];

function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [note, setNote] = useState({ note: '', nextFollowUpDate: '', status: 'Follow-Up' });

  const loadLead = async () => {
    const response = await getLead(id);
    setLead(response.data);
    setNote((current) => ({ ...current, status: response.data.status }));
  };

  useEffect(() => {
    loadLead();
  }, [id]);

  const changeStatus = async (event) => {
    const status = event.target.value;
    await updateLead(id, { status });
    loadLead();
  };

  const saveNote = async (event) => {
    event.preventDefault();
    await addFollowUp(id, note);
    setNote({ note: '', nextFollowUpDate: '', status: 'Follow-Up' });
    loadLead();
  };

  if (!lead) return <section className="section">Loading lead...</section>;

  return (
    <section className="section lead-detail">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Customer Details Page</p>
          <h1>{lead.fullName}</h1>
        </div>
        <Link className="btn-outline" to="/admin/leads">Back to Leads</Link>
      </div>

      <div className="lead-detail-grid">
        <article className="info-card">
          <h2>Customer Details</h2>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phoneNumber}</p>
          <p><strong>Message:</strong> {lead.message}</p>
          <label>Lead Status Tracking<select onChange={changeStatus} value={lead.status}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        </article>

        <form className="admin-form" onSubmit={saveNote}>
          <h2>Follow-Up Management</h2>
          <label>Follow-Up Note<textarea onChange={(event) => setNote((current) => ({ ...current, note: event.target.value }))} required value={note.note} /></label>
          <label>Next Follow-Up Date<input onChange={(event) => setNote((current) => ({ ...current, nextFollowUpDate: event.target.value }))} type="date" value={note.nextFollowUpDate} /></label>
          <label>Status<select onChange={(event) => setNote((current) => ({ ...current, status: event.target.value }))} value={note.status}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          <button className="btn" type="submit">Add Follow-Up</button>
        </form>
      </div>

      <section className="content-band">
        <h2>Follow-Up Notes and History</h2>
        <div className="history-list">
          {lead.followUps?.length ? lead.followUps.map((item) => (
            <article key={item._id}>
              <p>{item.note}</p>
              <span>{new Date(item.createdAt).toLocaleString()}</span>
              {item.nextFollowUpDate && <span>Next: {new Date(item.nextFollowUpDate).toLocaleDateString()}</span>}
            </article>
          )) : <p className="empty-state">No follow-up history yet.</p>}
        </div>
      </section>
    </section>
  );
}

export default LeadDetails;
