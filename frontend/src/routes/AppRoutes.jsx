/* eslint-disable no-undef */
import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import ProtectedRoute from './ProtectedRoute';
import AddProperty from '../pages/admin/AddProperty';
import AdminDashboard from '../pages/admin/AdminDashboard';
import BookingManagement from '../pages/admin/BookingManagement';
import FeedbackManagement from '../pages/admin/FeedbackManagement';
import InstallmentRecords from '../pages/admin/InstallmentRecords';
import InvoiceManagement from '../pages/admin/InvoiceManagement';
import LeadDetails from '../pages/admin/LeadDetails';
import LeadManagement from '../pages/admin/LeadManagement';
import PaymentTracking from '../pages/admin/PaymentTracking';
import ReceiptManagement from '../pages/admin/ReceiptManagement';
import MyBookings from '../pages/client/MyBookings';
import About from '../pages/public/About';
import BookingConfirmation from '../pages/public/BookingConfirmation';
import BookingPage from '../pages/public/BookingPage';
import Dashboard from '../pages/public/Dashboard';
import ContactPage from '../pages/public/ContactPage';
import Home from '../pages/public/Home';
import InquiryForm from '../pages/public/InquiryForm';
import Login from '../pages/public/Login';
import PaymentInformation from '../pages/public/PaymentInformation';
import PropertyDetails from '../pages/public/PropertyDetails';
import PropertyList from '../pages/public/PropertyList';
import Register from '../pages/public/Register';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/payment-info" element={<PaymentInformation />} />
        <Route path="/inquiry" element={<InquiryForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
        <Route element={<ProtectedRoute admin />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<BookingManagement />} />
          <Route path="/admin/leads" element={<LeadManagement />} />
          <Route path="/admin/feedbacks" element={<FeedbackManagement />} />
          <Route path="/admin/payments" element={<PaymentTracking />} />
          <Route path="/admin/invoices" element={<InvoiceManagement />} />
          <Route path="/admin/installments" element={<InstallmentRecords />} />
          <Route path="/admin/receipts" element={<ReceiptManagement />} />
          <Route path="/admin/leads/:id" element={<LeadDetails />} />
          <Route path="/admin/properties/add" element={<AddProperty />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;