import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import ProtectedRoute from './ProtectedRoute';
import AddProperty from '../pages/admin/AddProperty';
import AdminDashboard from '../pages/admin/AdminDashboard';
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
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute admin />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/properties/add" element={<AddProperty />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
