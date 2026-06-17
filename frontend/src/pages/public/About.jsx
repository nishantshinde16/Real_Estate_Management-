import { useState } from 'react';
import { createLead } from '../../services/leadService';
import { createFeedback } from "../../services/feedbackService";
const aboutBlocks = [
  // ['Company Overview', 'Shilpa helps real estate teams present properties, capture qualified customers, and manage every lead from first message to conversion.'],
  ['Mission', 'To make property discovery and customer follow-up simpler, faster, and more transparent for buyers, owners, and managers.'],
  ['Vision', 'To become a dependable digital growth partner for modern real estate businesses.'],
  ['Our Values', 'Trust, clarity, service quality, accountability, and consistent communication guide every customer interaction.'],
  ['Customer Satisfaction', 'We prioritize timely responses, organized customer details, and follow-up visibility so no opportunity is missed.'],
  ['Technology & Innovation', 'Our MERN platform combines responsive public pages, REST APIs, MongoDB data, and an admin dashboard for daily operations.'],
  ['Business Growth Support', 'Lead tracking, status pipelines, search, filtering, and follow-up history help teams convert interest into measurable growth.'],
];

const services = ['Property showcasing', 'Customer lead capture', 'Lead status tracking', 'Follow-up management', 'Business dashboard reporting'];
const reasons = ['Responsive digital experience', 'Centralized customer records', 'Simple CRUD workflows', 'Search-ready lead pipeline'];
const testimonials = [
  ['Aarav Mehta', 'The dashboard made our follow-ups more disciplined and helped our team respond faster.'],
  ['Priya Nair', 'A clean customer journey from the About page to lead capture and admin tracking.'],
];

const initialLead = { fullName: '', email: '', phoneNumber: '', message: '' };

function About() {
  const [lead, setLead] = useState(initialLead);
  const [status, setStatus] = useState('');

  const [feedbackName, setFeedbackName] = useState("");
const [feedbackText, setFeedbackText] = useState("");
const [rating, setRating] = useState(5);

  const updateLead = (event) => {
    const { name, value } = event.target;
    setLead((current) => ({ ...current, [name]: value }));
  };
const submitFeedback = async (e) => {
  e.preventDefault();

  try {
    await createFeedback({
      name: feedbackName,
      feedback: feedbackText,
      rating,
    });

    alert("Feedback Submitted Successfully");

    setFeedbackName("");
    setFeedbackText("");
    setRating(5);
  } catch (error) {
    alert("Failed to submit feedback");
  }
};

  const submitLead = async (event) => {
    event.preventDefault();
    setStatus('Submitting...');

    try {
      await createLead(lead);
      setLead(initialLead);
      setStatus('Thanks. Your enquiry has been submitted.');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to submit lead right now.');
    }
  };

  return (
    <>
      <section className="about-hero">
        <div>
          
          <h1>Real estate customer growth, organized from first visit to follow-up.</h1>
          <p>Build confidence with a polished company profile and capture every customer enquiry in a trackable lead pipeline.</p>
        </div>
      </section>

      <div className="page-shell">
        <section className="about-grid" id="about">
          {aboutBlocks.map(([title, description]) => (
            <article className="info-card" key={title}>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <section className="content-band" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Services</h2>
            </div>
          </div>
          <div className="service-list">
            {services.map((service) => <span key={service}>{service}</span>)}
          </div>
        </section>

        <section className="content-band" id="why-choose-us">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Why Choose Us</p>
              <h2>Built for customer-focused real estate teams</h2>
            </div>
          </div>
          <div className="value-grid">
            {reasons.map((reason) => <div key={reason}>{reason}</div>)}
          </div>
        </section>

        <section className="content-band" id="testimonials">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Testimonials</p>
              <h2>Customer voices</h2>
            </div>
          </div>
          <div className="testimonial-grid">
            {testimonials.map(([name, quote]) => (
              <blockquote key={name}>
                <p>{quote}</p>
                <cite>{name}</cite>
              </blockquote>
            ))}
          </div>
          <form className="feedback-form" onSubmit={submitFeedback}>
  <h3>Share Your Feedback</h3>

  <input
    type="text"
    placeholder="Your Name"
    value={feedbackName}
    onChange={(e) => setFeedbackName(e.target.value)}
    required
  />
<label>Rating</label>
<div className="star-rating">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={rating >= star ? "star active" : "star"}
      onClick={() => setRating(star)}
    >
      ★
    </span>
  ))}
</div>

  

  <textarea
    placeholder="Write your feedback..."
    value={feedbackText}
    onChange={(e) => setFeedbackText(e.target.value)}
    required
  />

  <button className="btn" type="submit">
    Submit Feedback
  </button>
</form>
        </section>

        <section className="lead-section" id="contact">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Lead Form</h2>
            <p>Share your details and the admin team can track your status, customer details, and follow-up history.</p>
          </div>
          <form className="lead-form" onSubmit={submitLead}>
            <label>Full Name<input name="fullName" onChange={updateLead} required value={lead.fullName} /></label>
            <label>Email<input name="email" onChange={updateLead} required type="email" value={lead.email} /></label>
            <label>Phone Number<input name="phoneNumber" onChange={updateLead} required value={lead.phoneNumber} /></label>
            <label>Message<textarea name="message" onChange={updateLead} required value={lead.message} /></label>
            <button className="btn" type="submit">Submit Lead</button>
            {status && <p className={status.startsWith('Thanks') ? 'success' : 'error'}>{status}</p>}
          </form>
        </section>
      </div>
    </>
  );
}

export default About;
