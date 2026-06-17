import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import ProtectedRoute from './ProtectedRoute';
import AddProperty from '../pages/admin/AddProperty';
import AdminDashboard from '../pages/admin/AdminDashboard';
import BookingManagement from '../pages/admin/BookingManagement';
import LeadDetails from '../pages/admin/LeadDetails';
import LeadManagement from '../pages/admin/LeadManagement';
import MyBookings from '../pages/client/MyBookings';
import About from '../pages/public/About';
import BookingConfirmation from '../pages/public/BookingConfirmation';
import BookingPage from '../pages/public/BookingPage';
import Dashboard from '../pages/public/Dashboard';
import Contact from '../pages/public/Contact';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
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
        <Route path="/contact" element={<Contact />} />
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
          <Route path="/admin/leads/:id" element={<LeadDetails />} />
          <Route path="/admin/properties/add" element={<AddProperty />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
