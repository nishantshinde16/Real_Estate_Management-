const mongoose = require('mongoose'); // Or your existing ORM (Prisma/Sequelize)

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Apartment, House, Villa
  price: { type: Number, required: true },
  location: { type: String, required: true }, // City/Neighborhood
  address: { type: String, required: true },
  area: { type: Number, required: true }, // Sq.ft
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String, required: true },
  amenities: [{ type: String }], // e.g., ["Pool", "Gym", "Parking"]
  images: [{ type: String }], // Array of image URLs
  status: { type: String, enum: ['Available', 'Sold', 'Booked'], default: 'Available' },
  agentInfo: {
    name: { type: String },
    phone: { type: String },
    email: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);