import React, { useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import './PageStyles.css';

const GalleryThumb = ({ label }) => (
  <svg viewBox="0 0 320 220" width="100%" height="180" style={{ display: 'block' }}>
    <defs>
      <linearGradient id={`g${label}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="100%" stopColor="#fef9c3" />
      </linearGradient>
    </defs>
    <rect width="320" height="220" fill={`url(#g${label})`} />
    <circle cx="270" cy="45" r="24" fill="#fde047" />
    <rect y="160" width="320" height="60" fill="#4ade80" />
    <rect x="70" y="60" width="150" height="105" fill="#fbbf24" />
    <path d="M55 65 L145 15 L235 65 Z" fill="#14532d" />
    {[90, 130, 170].map((x) => (
      <rect key={x} x={x} y="85" width="18" height="24" rx="3" fill="#7dd3fc" stroke="#92400e" strokeWidth="2" />
    ))}
    <rect x="135" y="118" width="20" height="47" rx="4" fill="#7c2d12" />
    <circle cx="88" cy="180" r="9" fill="#fcd34d" />
    <circle cx="88" cy="171" r="8" fill="#f5d0a9" />
    <path d="M80 184 C80 176 96 176 96 184 Z" fill="#14532d" />
    <rect x="80" y="179" width="16" height="18" rx="4" fill="#166534" />
    <circle cx="215" cy="180" r="9" fill="#1e3a8a" />
    <circle cx="215" cy="171" r="8" fill="#e2b48c" />
    <path d="M207 184 C207 176 223 176 223 184 Z" fill="#14532d" />
    <rect x="207" y="179" width="16" height="18" rx="4" fill="#166534" />
  </svg>
);

const categories = ['All', 'Campus', 'Events', 'Sports', 'Classrooms'];

const galleryItems = [
  { title: 'Main School Building', category: 'Campus' },
  { title: 'Annual Sports Gala', category: 'Sports' },
  { title: 'Science Lab', category: 'Campus' },
  { title: 'Independence Day', category: 'Events' },
  { title: 'Smart Classroom', category: 'Classrooms' },
  { title: 'Library', category: 'Campus' },
  { title: 'Computer Lab', category: 'Classrooms' },
  { title: 'Arts Exhibition', category: 'Events' },
  { title: 'Football Team', category: 'Sports' },
];

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);

  const items = filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <>
      <PageBanner
        title="Gallery"
        subtitle="A glimpse into life at Bright Future High School — our campus, events, and happy moments."
      />

      <section className="section">
        <div className="container">
          <div className="event-filter">
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-btn ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {items.map((g, i) => (
              <div key={g.title + i} className="gallery-item fade-up" onClick={() => setOpen(g)}>
                <GalleryThumb label={g.title + i} />
                <div className="gallery-caption">
                  <span>🔍 {g.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <GalleryThumb label={'light' + open.title} />
            <h3>{open.title}</h3>
            <p>Category: {open.category} — Bright Future High School</p>
            <button className="btn btn-gold" onClick={() => setOpen(null)}>Close ✕</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
