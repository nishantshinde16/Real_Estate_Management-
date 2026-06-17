function PaymentInformation() {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Payment Information</p>
          <h1>Bank, UPI, and Payment Instructions</h1>
        </div>
      </div>
      <div className="finance-grid">
        <article className="info-card">
          <h2>Bank Details</h2>
          <p>Account Name: UrbanNest Realty Pvt. Ltd.</p>
          <p>Account Number: 123456789012</p>
          <p>IFSC: URBN0001234</p>
          <p>Bank: Urban Cooperative Bank</p>
        </article>
        <article className="info-card">
          <h2>UPI Details</h2>
          <p>UPI ID: urbannest@upi</p>
          <p>Registered Mobile: +91 98765 43210</p>
          <p>Beneficiary: UrbanNest Realty Pvt. Ltd.</p>
        </article>
        <article className="info-card">
          <h2>Payment Instructions</h2>
          <p>Use your booking ID or property name as the payment remark.</p>
          <p>Share the transaction ID with the admin team after payment.</p>
          <p>Receipts are generated after admin verification.</p>
        </article>
        <article className="info-card qr-placeholder">
          <h2>QR Placeholder</h2>
          <div>UPI QR</div>
        </article>
      </div>
    </section>
  );
}

export default PaymentInformation;
