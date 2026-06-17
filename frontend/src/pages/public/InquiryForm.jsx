import { useState } from 'react';
import { createCustomerInquiry } from '../../services/financeService';

const emptyForm = { name: '', email: '', phone: '', property: '', inquiryType: 'Site Visit', message: '' };
const inquiryTypes = ['Site Visit', 'Price Request', 'Availability', 'Loan Assistance', 'Other'];

function InquiryForm() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await createCustomerInquiry(form);
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Customer Inquiry</p>
          <h1>Inquiry Form</h1>
        </div>
      </div>
      <form className="admin-form finance-form" onSubmit={submit}>
        {sent && <p className="success">Inquiry saved successfully.</p>}
        <label>Name<input name="name" onChange={updateField} required value={form.name} /></label>
        <label>Email<input name="email" onChange={updateField} required type="email" value={form.email} /></label>
        <label>Phone<input name="phone" onChange={updateField} required value={form.phone} /></label>
        <label>Property<input name="property" onChange={updateField} required value={form.property} /></label>
        <label>Inquiry Type<select name="inquiryType" onChange={updateField} value={form.inquiryType}>{inquiryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
        <label>Message<textarea name="message" onChange={updateField} required value={form.message} /></label>
        <button className="btn" type="submit">Submit Inquiry</button>
      </form>
    </section>
  );
}

export default InquiryForm;
