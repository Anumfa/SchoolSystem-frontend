import React from 'react';

const Logo = ({ size = 54 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    aria-label="Bright Future High School Logo"
  >
    <defs>
      <linearGradient id="shieldTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#166534" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
      <linearGradient id="goldBand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
    <path d="M32 2 L60 12 V34 C60 48 48 58 32 62 C16 58 4 48 4 34 V12 Z" fill="url(#shieldTop)" />
    <path d="M32 7 L55 15 V33 C55 44 45 52 32 56 C19 52 9 44 9 33 V15 Z" fill="#ffffff" />
    <path d="M32 12 L50 18 V32 C50 40 42 46 32 49 C22 46 14 40 14 32 V18 Z" fill="url(#shieldTop)" />
    {/* Open book */}
    <path
      d="M32 22 C29 19.5 24 19 21 20 V34 C24 33 29 33.5 32 36 C35 33.5 40 33 43 34 V20 C40 19 35 19.5 32 22 Z"
      fill="url(#goldBand)"
    />
    <path d="M32 36 V24" stroke="#ffffff" strokeWidth="1.2" />
    {/* Star */}
    <path
      d="M32 28.5 L33.4 31.3 L36.5 31.8 L34.2 34 L34.8 37 L32 35.6 L29.2 37 L29.8 34 L27.5 31.8 L30.6 31.3 Z"
      fill="#ffffff"
    />
    <text
      x="32"
      y="47"
      fontFamily="Georgia, serif"
      fontSize="8.5"
      fontWeight="bold"
      fill="#ffffff"
      textAnchor="middle"
      letterSpacing="1"
    >
      BFHS
    </text>
  </svg>
);

export default Logo;
