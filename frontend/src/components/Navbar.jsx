import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/movies', label: 'Movies', icon: '🎬' },
  ];

  if (user.role === 'ADMIN') {
    navLinks.push({ to: '/admin', label: 'Admin Panel', icon: '⚙️' });
  }
  if (user.role === 'THEATRE_OWNER') {
    navLinks.push({ to: '/theatre-owner', label: 'Manage Shows', icon: '🎭' });
  }

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner container">
        <Link to="/dashboard" className="navbar-brand" id="nav-brand">
          <span className="brand-icon">🎬</span>
          <span className="brand-text">CineVerse</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              id={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-label">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <div className="user-info">
            <div className="user-avatar" id="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-role badge badge-gold">{user.role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary btn-sm" id="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
