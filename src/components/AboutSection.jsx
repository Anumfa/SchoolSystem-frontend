import React from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => (
  <section className="about-section">
    <div className="container about-grid">
      <div className="about-text fade-up">
        <span className="section-tag">About Our School</span>
        <h2 className="section-title">Nurturing Minds, Inspiring Excellence</h2>
        <p className="about-lead">
          Bright Future High School is committed to providing a safe, inclusive, and challenging
          environment where every student is empowered to achieve academic excellence and personal growth.
        </p>
        <p className="about-body">
          Since our founding, we have been dedicated to fostering intellectual curiosity, moral integrity,
          and leadership skills in our students. With state-of-the-art facilities and a passionate faculty,
          we prepare learners for a dynamic world.
        </p>
        <ul className="about-points">
          <li>✅ Fully qualified & trained teaching staff</li>
          <li>✅ Modern science & computer laboratories</li>
          <li>✅ Safe, disciplined & caring campus environment</li>
          <li>✅ Sports, arts & leadership development programs</li>
        </ul>
        <Link to="/about" className="btn btn-green">Learn More About Us →</Link>
      </div>

      <div className="about-visual fade-up">
        <div className="about-photo">
          <svg viewBox="0 0 520 400" width="100%" aria-label="School building photo">
            <defs>
              <linearGradient id="apsky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#fef9c3" />
              </linearGradient>
            </defs>
            <rect width="520" height="400" fill="url(#apsky)" />
            <circle cx="450" cy="70" r="36" fill="#fde047" />
            <rect y="300" width="520" height="100" fill="#4ade80" />
            <rect y="300" width="520" height="14" fill="#22c55e" />
            {/* Building */}
            <rect x="90" y="130" width="340" height="175" fill="#fbbf24" />
            <rect x="90" y="130" width="340" height="175" fill="#d97706" opacity="0.18" />
            <path d="M70 135 L260 55 L450 135 Z" fill="#14532d" />
            <rect x="240" y="55" width="40" height="20" fill="#166534" />
            {[120, 170, 220, 270, 320, 370].map((x) => (
              <g key={x}>
                <rect x={x} y="160" width="34" height="46" rx="4" fill="#7dd3fc" stroke="#92400e" strokeWidth="3" />
                <line x1={x + 17} y1="160" x2={x + 17} y2="206" stroke="#92400e" strokeWidth="3" />
              </g>
            ))}
            {[120, 170, 220, 270, 320, 370].map((x) => (
              <g key={'b' + x}>
                <rect x={x} y="230" width="34" height="46" rx="4" fill="#7dd3fc" stroke="#92400e" strokeWidth="3" />
                <line x1={x + 17} y1="230" x2={x + 17} y2="276" stroke="#92400e" strokeWidth="3" />
              </g>
            ))}
            <rect x="230" y="245" width="60" height="60" rx="6" fill="#7c2d12" />
            <rect x="230" y="245" width="60" height="60" rx="6" fill="none" stroke="#92400e" strokeWidth="3" />
            <rect x="226" y="270" width="68" height="5" fill="#92400e" />
            <rect x="120" y="110" width="280" height="24" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="260" y="127" fontFamily="Georgia, serif" fontSize="15" fontWeight="bold" fill="#92400e" textAnchor="middle">BRIGHT FUTURE HIGH SCHOOL</text>
            {/* students */}
            <circle cx="140" cy="340" r="11" fill="#1e3a8a" />
            <circle cx="140" cy="328" r="12" fill="#f5d0a9" />
            <path d="M129 343 C129 331 151 331 151 343 Z" fill="#14532d" />
            <rect x="129" y="336" width="22" height="28" rx="5" fill="#166534" />
            <rect x="380" cy="0" y="338" width="22" height="28" rx="5" fill="#166534" />
            <circle cx="391" cy="330" r="11" fill="#1e3a8a" />
            <circle cx="391" cy="318" r="12" fill="#e2b48c" />
          </svg>
        </div>
        <div className="about-badge floaty">
          <span className="about-badge-num">25+</span>
          <span className="about-badge-label">Years of<br />Excellence</span>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
