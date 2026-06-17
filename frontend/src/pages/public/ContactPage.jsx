import { useState } from 'react';
import { createContactMessage } from '../../services/financeService';

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' };

function ContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await createContactMessage(form);
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <section className="section contact-page">
      <div className="info-card">
        <p className="eyebrow">Contact UrbanNest</p>
        <h1>Company Contact Details</h1>
        <p>Office: UrbanNest Realty, 4th Floor, Business Park, Pune, Maharashtra</p>
        <p>Email: support@urbannest.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Hours: Monday to Saturday, 10:00 AM to 7:00 PM</p>
      </div>
      <form className="admin-form" onSubmit={submit}>
        <h2>Send a Message</h2>
        {sent && <p className="success">Message saved successfully.</p>}
        <label>Name<input name="name" onChange={updateField} required value={form.name} /></label>
        <label>Email<input name="email" onChange={updateField} required type="email" value={form.email} /></label>
        <label>Phone<input name="phone" onChange={updateField} required value={form.phone} /></label>
        <label>Subject<input name="subject" onChange={updateField} required value={form.subject} /></label>
        <label>Message<textarea name="message" onChange={updateField} required value={form.message} /></label>
        <button className="btn" type="submit">Submit Message</button>
      </form>
    </section>
  );
}

export default ContactPage;
