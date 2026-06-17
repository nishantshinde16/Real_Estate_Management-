import { useState } from 'react';
import { createContactMessage, createCustomerInquiry } from '../../services/financeService';

const emptyContactForm = { name: '', email: '', phone: '', subject: '', message: '' };
const emptyInquiryForm = { name: '', email: '', phone: '', property: '', inquiryType: 'Site Visit', message: '' };
const inquiryTypes = ['Site Visit', 'Price Request', 'Availability', 'Loan Assistance', 'Other'];

function ContactPage() {
  const [contactForm, setContactForm] = useState(emptyContactForm);
  const [inquiryForm, setInquiryForm] = useState(emptyInquiryForm);
  const [contactSent, setContactSent] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const updateContactField = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
  };

  const updateInquiryField = (event) => {
    const { name, value } = event.target;
    setInquiryForm((current) => ({ ...current, [name]: value }));
  };

  const submitContact = async (event) => {
    event.preventDefault();
    await createContactMessage(contactForm);
    setContactSent(true);
    setContactForm(emptyContactForm);
  };

  const submitInquiry = async (event) => {
    event.preventDefault();
    await createCustomerInquiry(inquiryForm);
    setInquirySent(true);
    setInquiryForm(emptyInquiryForm);
  };

  return (
    <section className="section">
      <div className="section-heading contact-heading">
        <div>
          <p className="eyebrow">Contact UrbanNest</p>
          <h1>Contact and Property Inquiry</h1>
        </div>
      </div>
      <div className="contact-page contact-combined">
        <div className="contact-stack">
          <div className="info-card">
            <h2>Company Contact Details</h2>
            <p>Office: UrbanNest Realty, 4th Floor, Business Park, Pune, Maharashtra</p>
            <p>Email: support@urbannest.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Hours: Monday to Saturday, 10:00 AM to 7:00 PM</p>
          </div>
          <form className="admin-form" onSubmit={submitContact}>
            <h2>Send a Message</h2>
            {contactSent && <p className="success">Message saved successfully.</p>}
            <label>Name<input name="name" onChange={updateContactField} required value={contactForm.name} /></label>
            <label>Email<input name="email" onChange={updateContactField} required type="email" value={contactForm.email} /></label>
            <label>Phone<input name="phone" onChange={updateContactField} required value={contactForm.phone} /></label>
            <label>Subject<input name="subject" onChange={updateContactField} required value={contactForm.subject} /></label>
            <label>Message<textarea name="message" onChange={updateContactField} required value={contactForm.message} /></label>
            <button className="btn" type="submit">Submit Message</button>
          </form>
        </div>

        <form className="admin-form inquiry-panel" onSubmit={submitInquiry}>
          <p className="eyebrow">Quick Inquiry</p>
          <h2>Property Inquiry Form</h2>
          {inquirySent && <p className="success">Inquiry saved successfully.</p>}
          <label>Name<input name="name" onChange={updateInquiryField} required value={inquiryForm.name} /></label>
          <label>Email<input name="email" onChange={updateInquiryField} required type="email" value={inquiryForm.email} /></label>
          <label>Phone<input name="phone" onChange={updateInquiryField} required value={inquiryForm.phone} /></label>
          <label>Property<input name="property" onChange={updateInquiryField} required value={inquiryForm.property} /></label>
          <label>Inquiry Type<select name="inquiryType" onChange={updateInquiryField} value={inquiryForm.inquiryType}>{inquiryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
          <label>Message<textarea name="message" onChange={updateInquiryField} required value={inquiryForm.message} /></label>
          <button className="btn" type="submit">Submit Inquiry</button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
