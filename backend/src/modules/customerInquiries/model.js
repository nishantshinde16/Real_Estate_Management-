const mongoose = require('mongoose');

const customerInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    property: { type: String, required: true, trim: true },
    inquiryType: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  },
  { timestamps: true, collection: 'customer_inquiries' }
);

module.exports = mongoose.model('CustomerInquiry', customerInquirySchema);
