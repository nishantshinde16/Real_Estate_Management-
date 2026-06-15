import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PublicLayout() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <>
      <header className="navbar">
        <Link to="/" className="brand">UrbanNest</Link>
        <nav>
          <NavLink to="/">Home</NavLink>
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
      <footer className="footer">
        <div>
          <h2>UrbanNest</h2>
          <p>Modern property discovery and management for growing real estate teams.</p>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
        </nav>
      </footer>
    </>
  );
}

export default PublicLayout;
