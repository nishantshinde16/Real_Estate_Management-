const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    property: { type: String, required: true, trim: true },
    installmentNo: { type: Number, required: true, min: 1 },
    amount: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: true },
    paidDate: { type: Date },
    status: { type: String, enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true, collection: 'installments' }
);

module.exports = mongoose.model('Installment', installmentSchema);
