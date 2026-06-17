const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/api/health', (req, res) => res.json({ message: 'Real Estate API is running' }));
app.use('/api/auth', require('./modules/auth/routes'));
app.use("/api/feedbacks", require("../routes/feedbackRoutes"));
app.use('/api/properties', require('./modules/properties/routes'));
app.use('/api/inquiries', require('./modules/inquiries/routes'));
app.use('/api/leads', require('./modules/leads/routes'));
app.use('/api/bookings', require('./modules/bookings/routes'));
app.use('/api/users', require('./modules/users/routes'));
app.use('/api/contact-messages', require('./modules/contactMessages/routes'));
app.use('/api/customer-inquiries', require('./modules/customerInquiries/routes'));
app.use('/api/payments', require('./modules/payments/routes'));
app.use('/api/invoices', require('./modules/invoices/routes'));
app.use('/api/installments', require('./modules/installments/routes'));
app.use('/api/receipts', require('./modules/receipts/routes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
