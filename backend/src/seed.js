const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./modules/auth/model');
const Property = require('./modules/properties/model');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const adminUser = {
  name: 'Admin',
  email: 'babitawaghmare614@gmail.com',
  password: 'admin9860',
  role: 'admin',
};

const starterProperties = [
  {
    title: 'Skyline Heights Apartment',
    description: 'Premium apartment with city views and modern amenities.',
    location: 'Mumbai, Maharashtra',
    propertyType: 'Apartment',
    price: 85000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Greenfield Family Villa',
    description: 'Spacious villa designed for comfortable family living.',
    location: 'Pune, Maharashtra',
    propertyType: 'Villa',
    price: 145000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Central Business Office',
    description: 'Commercial office space in a prime business location.',
    location: 'Bengaluru, Karnataka',
    propertyType: 'Commercial',
    price: 210000,
    bedrooms: 0,
    bathrooms: 3,
    area: 4800,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  },
];

const seed = async () => {
  await connectDB();

  let admin = await User.findOne({ email: adminUser.email });
  if (!admin) {
    admin = await User.create(adminUser);
  }

  for (const property of starterProperties) {
    await Property.findOneAndUpdate(
      { title: property.title, location: property.location },
      { ...property, owner: admin._id },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }

  console.log('MongoDB seed completed');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
