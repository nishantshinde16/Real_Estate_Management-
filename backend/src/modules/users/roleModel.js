const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: '', trim: true },
    permissions: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);
