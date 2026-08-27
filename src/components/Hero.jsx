import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SchoolScene from './SchoolScene.jsx';
import './Hero.css';

const slides = [
  {
    tag: 'WELCOME TO BFHS',
    title: 'Building Brighter Futures Together',
    subtitle:
      'Bright Future High School nurtures young minds with quality education, experienced faculty, and modern facilities — empowering students to excel in academics and life.',
  },
  {
    tag: 'EXCELLENCE IN EDUCATION',
    title: 'Learn. Grow. Achieve. Every Day.',
    subtitle:
      'From KG to Matriculation, our comprehensive curriculum blends academics, sports, and character building to shape tomorrow’s leaders.',
  },
  {
    tag: 'ADMISSIONS OPEN 2026-27',
    title: 'Join the Bright Future Family',
    subtitle:
      'Limited seats available for the new academic session. Apply today and give your child the head start they deserve.',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero">
      <div className="container hero-inner">
        {/* Text content */}
        <div className="hero-content">
          <div className="hero-slide fade-up" key={current}>
            <span className="hero-tag">{slides[current].tag}</span>
            <h1>{slides[current].title}</h1>
            <p>{slides[current].subtitle}</p>
          </div>
          <div className="hero-actions">
            <Link to="/about" className="btn btn-gold">Discover More →</Link>
            <Link to="/academics" className="btn btn-outline-light">View Programs</Link>
          </div>

          {/* Slider dots */}
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Banner picture */}
        <div className="hero-image floaty">
          <div className="hero-image-frame">
            <SchoolScene />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <svg className="hero-wave" viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path d="M0,50 C240,90 480,0 720,30 C960,60 1200,80 1440,40 L1440,90 L0,90 Z" fill="#faf8f3" />
      </svg>
    </section>
  );
};

export default Hero;
