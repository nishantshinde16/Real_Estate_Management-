import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PublicLayout() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <>
      <header className="navbar">
        <Link to="/" className="brand">EstatePro</Link>
        <nav>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          {user ? <button className="link-button" onClick={logout}>Logout</button> : <NavLink to="/login">Login</NavLink>}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">EstatePro Real Estate Management System</footer>
    </>
  );
}

export default PublicLayout;
