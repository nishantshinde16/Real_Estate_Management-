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
          <NavLink to="/about">About</NavLink>
          {/* <NavLink to="/about#services">Services</NavLink>
          <NavLink to="/about#why-choose-us">Why Choose Us</NavLink>
          <NavLink to="/about#testimonials">Testimonials</NavLink> */}
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/properties">Booking</NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          {user && <NavLink to="/my-bookings">My Bookings</NavLink>}
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          {isAdmin && <NavLink to="/admin/bookings">Booking Admin</NavLink>}
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
          <Link to="/about">About</Link>
          <Link to="/about#services">Services</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/properties">Booking</Link>
          <Link to="/contact">Contact</Link>
          {user && <Link to="/my-bookings">My Bookings</Link>}
          {isAdmin && <Link to="/admin">Admin</Link>}
        </nav>
      </footer>
    </>
  );
}

export default PublicLayout;
