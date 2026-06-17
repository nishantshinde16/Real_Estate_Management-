const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    property: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    paymentMode: { type: String, required: true, trim: true },
    transactionId: { type: String, trim: true, default: '' },
    paymentDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true, collection: 'payments' }
);

module.exports = mongoose.model('Payment', paymentSchema);
