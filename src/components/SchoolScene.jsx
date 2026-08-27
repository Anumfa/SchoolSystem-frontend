import React from 'react';

/**
 * SchoolScene - a reusable illustrated "banner picture" of the school.
 * Renders a cute cartoon school building with students, trees and sun.
 */
const SchoolScene = ({ variant = 'default', width = 600 }) => {
  return (
    <svg viewBox="0 0 640 420" width="100%" style={{ maxWidth: width }} role="img" aria-label="Bright Future High School illustration">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#fef9c3" />
        </linearGradient>
        <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
        <linearGradient id="brick" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="640" height="420" fill="url(#sky)" />

      {/* Sun */}
      <circle cx="560" cy="70" r="42" fill="#fde047" />
      <circle cx="560" cy="70" r="52" fill="none" stroke="#fde047" strokeWidth="6" opacity="0.4" />
      <circle cx="560" cy="70" r="62" fill="none" stroke="#fde047" strokeWidth="4" opacity="0.2" />

      {/* Clouds */}
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="120" cy="80" rx="45" ry="22" />
        <ellipse cx="160" cy="72" rx="35" ry="18" />
        <ellipse cx="90" cy="72" rx="30" ry="16" />
        <ellipse cx="360" cy="50" rx="40" ry="18" />
        <ellipse cx="395" cy="44" rx="28" ry="14" />
      </g>

      {/* Ground */}
      <rect y="330" width="640" height="90" fill="#4ade80" />
      <rect y="330" width="640" height="16" fill="#22c55e" />

      {/* Trees */}
      <g>
        <rect x="60" y="240" width="16" height="95" fill="#8b5a2b" rx="4" />
        <circle cx="68" cy="220" r="42" fill="#15803d" />
        <circle cx="45" cy="235" r="30" fill="#16a34a" />
        <circle cx="92" cy="235" r="30" fill="#16a34a" />
        <rect x="548" y="240" width="16" height="95" fill="#8b5a2b" rx="4" />
        <circle cx="556" cy="220" r="42" fill="#15803d" />
        <circle cx="533" cy="235" r="30" fill="#16a34a" />
        <circle cx="580" cy="235" r="30" fill="#16a34a" />
      </g>

      {/* School building */}
      <g>
        {/* Main block */}
        <rect x="180" y="170" width="280" height="165" fill="url(#brick)" />
        <rect x="180" y="170" width="280" height="165" fill="#f59e0b" opacity="0.15" />
        {/* Roof */}
        <path d="M160 175 L320 95 L480 175 Z" fill="url(#roof)" />
        <rect x="300" y="95" width="40" height="22" fill="#166534" />
        {/* Flag pole */}
        <rect x="318" y="62" width="4" height="40" fill="#7c2d12" />
        <path d="M322 64 L348 72 L322 80 Z" fill="#ef4444" />
        {/* Flag */}
        {/* Windows row 1 */}
        {[205, 250, 295, 340, 385].map((x) => (
          <g key={x}>
            <rect x={x} y="200" width="34" height="42" rx="4" fill="#7dd3fc" stroke="#92400e" strokeWidth="3" />
            <line x1={x + 17} y1="200" x2={x + 17} y2="242" stroke="#92400e" strokeWidth="3" />
            <line x1={x} y1="221" x2={x + 34} y2="221" stroke="#92400e" strokeWidth="3" />
          </g>
        ))}
        {/* Windows row 2 */}
        {[205, 250, 295, 340, 385].map((x) => (
          <g key={'r2' + x}>
            <rect x={x} y="258" width="34" height="42" rx="4" fill="#7dd3fc" stroke="#92400e" strokeWidth="3" />
            <line x1={x + 17} y1="258" x2={x + 17} y2="300" stroke="#92400e" strokeWidth="3" />
            <line x1={x} y1="279" x2={x + 34} y2="279" stroke="#92400e" strokeWidth="3" />
          </g>
        ))}
        {/* Door */}
        <rect x="298" y="265" width="44" height="70" rx="6" fill="#7c2d12" />
        <circle cx="332" cy="302" r="3" fill="#fbbf24" />
        <rect x="298" y="295" width="44" height="4" fill="#92400e" />
        {/* Banner sign */}
        <rect x="252" y="135" width="136" height="28" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="320" y="154" fontFamily="Georgia, serif" fontSize="15" fontWeight="bold" fill="#92400e" textAnchor="middle">WELCOME TO BFHS</text>
        {/* Clock */}
        <circle cx="320" cy="128" r="9" fill="#ffffff" stroke="#92400e" strokeWidth="2" />
        <line x1="320" y1="128" x2="320" y2="122" stroke="#92400e" strokeWidth="2" />
        <line x1="320" y1="128" x2="325" y2="129" stroke="#92400e" strokeWidth="2" />
      </g>

      {/* Students - left */}
      <g>
        <circle cx="140" cy="352" r="12" fill="#fcd34d" />
        <circle cx="140" cy="340" r="13" fill="#f5d0a9" />
        <path d="M128 355 C128 342 152 342 152 355 Z" fill="#14532d" />
        <rect x="128" y="348" width="24" height="30" rx="6" fill="#166534" />
        <rect x="126" y="346" width="6" height="22" rx="3" fill="#b91c1c" />
        <rect x="148" y="346" width="6" height="22" rx="3" fill="#b91c1c" />
        <rect x="126" y="376" width="8" height="14" fill="#1e3a8a" />
        <rect x="146" y="376" width="8" height="14" fill="#1e3a8a" />
        <path d="M135 344 L148 338" stroke="#14532d" strokeWidth="3" />
      </g>

      {/* Students - right */}
      <g>
        <circle cx="505" cy="350" r="12" fill="#1e3a8a" />
        <circle cx="505" cy="338" r="13" fill="#e2b48c" />
        <path d="M493 353 C493 340 517 340 517 353 Z" fill="#14532d" />
        <rect x="493" y="346" width="24" height="30" rx="6" fill="#166534" />
        <rect x="491" y="344" width="6" height="22" rx="3" fill="#b91c1c" />
        <rect x="513" y="344" width="6" height="22" rx="3" fill="#b91c1c" />
        <rect x="491" y="374" width="8" height="14" fill="#1e3a8a" />
        <rect x="511" y="374" width="8" height="14" fill="#1e3a8a" />
        <path d="M510 342 L522 336" stroke="#14532d" strokeWidth="3" />
      </g>

      {/* Books on ground */}
      <g transform="translate(355, 355)">
        <rect width="30" height="8" rx="3" fill="#dc2626" />
        <rect width="26" height="8" y="-8" rx="3" fill="#2563eb" />
        <rect width="22" height="8" y="-16" rx="3" fill="#16a34a" />
      </g>

      {/* Grass tufts */}
      <g fill="#16a34a">
        <path d="M180 340 l4 -12 l4 12" />
        <path d="M260 340 l4 -12 l4 12" />
        <path d="M430 340 l4 -12 l4 12" />
        <path d="M480 338 l4 -12 l4 12" />
      </g>
    </svg>
  );
};

export default SchoolScene;
