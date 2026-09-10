import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import './Header.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/academics', label: 'Academics' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
];

// Honorifics we skip when picking a short display name (so "Mr. Ahmed Raza" → "Ahmed")
const TITLES = ['mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'sir', 'madam'];

const shortName = (fullName = '') => {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  const named = parts.find((p) => !TITLES.includes(p.replace(/\./g, '').toLowerCase()));
  return (named || parts[0] || '').replace(/\.$/, '');
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('bfhs_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bfhs_token');
    localStorage.removeItem('bfhs_user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      {/* Top contact bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <a href="tel:+923001234567"><span>📞</span> +92 300 1234567</a>
            <a href="mailto:info@bfhs.edu.pk"><span>✉️</span> info@bfhs.edu.pk</a>
            <span className="topbar-address"><span>📍</span> 123 Education Street, Lahore, Pakistan</span>
          </div>
          <div className="topbar-right">
            <Link to="/student-portal" className="portal-link">🎓 Student Portal</Link>
            <Link to="/teacher-portal" className="portal-link">👩‍🏫 Teacher Portal</Link>
            <Link to="/admin-login" className="portal-link">🛡️ Admin Login</Link>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <div className="brand-logo"><Logo size={52} /></div>
          <div className="brand-text">
            <span className="brand-name">Bright Future</span>
            <span className="brand-sub">HIGH SCHOOL · LAHORE</span>
          </div>
        </Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/admissions" className="btn btn-gold apply-btn" onClick={() => setMenuOpen(false)}>
            <span className="apply-label">Apply Now</span>
            <span className="apply-arrow" aria-hidden="true">→</span>
          </Link>
          {user && (
            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
              title={`Signed in as ${user.name} (${user.role})`}
            >
              <span className="logout-avatar" aria-hidden="true">
                {(shortName(user.name)[0] || 'U').toUpperCase()}
              </span>
              <span className="logout-text">Logout</span>
            </button>
          )}
        </nav>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
