import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <div>
            <h3>Ready to Join the Bright Future Family?</h3>
            <p>Admissions open for the 2026-27 academic session. Limited seats available.</p>
          </div>
          <Link to="/admissions" className="btn btn-gold">Apply for Admission →</Link>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-about">
          <div className="footer-brand">
            <Logo size={54} />
            <div>
              <span className="footer-brand-name">Bright Future</span>
              <span className="footer-brand-sub">HIGH SCHOOL · LAHORE</span>
            </div>
          </div>
          <p className="footer-desc">
            Committed to providing a safe, inclusive, and challenging environment where every student
            is empowered to achieve academic excellence and holistic development.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>More</h4>
          <ul>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/student-portal">Student Portal</Link></li>
            <li><Link to="/teacher-portal">Teacher Portal</Link></li>
            <li><Link to="/admin-login">Admin Login</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-contact">
          <h4>Contact Info</h4>
          <ul>
            <li>📍 123 Education Street, Lahore, Pakistan</li>
            <li>📞 +92 300 1234567</li>
            <li>✉️ info@bfhs.edu.pk</li>
            <li>🕒 Mon - Sat: 8:00 AM - 2:30 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 Bright Future High School. All Rights Reserved.</span>
          <span>Building Brighter Futures Together ✦</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
