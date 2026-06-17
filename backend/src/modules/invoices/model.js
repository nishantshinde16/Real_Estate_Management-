const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    customerName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    property: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['Draft', 'Sent', 'Paid', 'Overdue'], default: 'Draft' },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true, collection: 'invoices' }
);

module.exports = mongoose.model('Invoice', invoiceSchema);
