import { useState } from 'react';
import { createInquiry } from '../../services/inquiryService';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    await createInquiry(form);
    setSent(true);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="section contact-page">
      <div>
        <h1>Contact</h1>
        <p>Send a property question, viewing request, or general inquiry. The admin dashboard stores every message.</p>
      </div>
      <form className="auth-card" onSubmit={submit}>
        {sent && <p className="success">Message sent successfully</p>}
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        <button className="btn">Send</button>
      </form>
    </section>
  );
}

export default Contact;
