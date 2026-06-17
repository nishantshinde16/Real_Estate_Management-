import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const adminLinks = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/properties/add', label: 'Properties' },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/leads', label: 'Leads' },
  { to: '/admin/feedbacks', label: 'Feedbacks' },
  { to: '/admin/payments', label: 'Payments' },
  { to: '/admin/invoices', label: 'Invoices' },
  { to: '/admin/installments', label: 'Installments' },
  { to: '/admin/receipts', label: 'Receipts' },
  { to: '/admin#users', label: 'Users' },
  { to: '/admin#roles', label: 'Roles & Permissions' },
];

function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-workspace">
      <aside className="admin-rail">
        <Link className="admin-rail__brand" to="/admin">
          <span>RE</span>
          <div>
            <strong>Real Estate Admin</strong>
            <small>Control Center</small>
          </div>
        </Link>
        <nav>
          {adminLinks.map((link) => (
            <NavLink key={link.label} to={link.to} end={link.to === '/admin'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <label>
            <span>Search</span>
            <input placeholder="Search modules, records, actions" type="search" />
          </label>
          <div className="admin-account">
            <div>
              <strong>{user?.name || 'Admin'}</strong>
              <small>{user?.email}</small>
            </div>
            <button className="btn-danger" onClick={logout}>Logout</button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
