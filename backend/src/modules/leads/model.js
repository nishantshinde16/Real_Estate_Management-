const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema(
  {
    note: { type: String, required: true, trim: true },
    nextFollowUpDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Follow-Up', 'Converted'],
      default: 'New',
    },
    source: { type: String, default: 'Website', trim: true },
    followUps: [followUpSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
