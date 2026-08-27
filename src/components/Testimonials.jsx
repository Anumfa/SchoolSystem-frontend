import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    quote:
      'BFHS has transformed my son into a confident, disciplined learner. The teachers genuinely care about every child’s progress.',
    name: 'Mrs. Nadia Aslam',
    role: 'Parent of Grade 8 Student',
    initial: 'N',
  },
  {
    quote:
      'The science labs and computer education here are outstanding. My daughter won first prize in the city science exhibition!',
    name: 'Mr. Imran Sheikh',
    role: 'Parent of Grade 10 Student',
    initial: 'I',
  },
  {
    quote:
      'A wonderful, safe environment with excellent academics and character building. Proud to be part of the BFHS family.',
    name: 'Mrs. Saira Batool',
    role: 'Alumna & Parent',
    initial: 'S',
  },
];

const Testimonials = () => (
  <section className="testimonials">
    <div className="container">
      <div className="text-center mb-4">
        <span className="section-tag">Parent Testimonials</span>
        <h2 className="section-title" style={{ color: 'var(--white)' }}>
          What Parents Say About Us
        </h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={t.name} className="testimonial-card fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="quote-mark">“</div>
            <p>{t.quote}</p>
            <div className="testimonial-person">
              <div className="avatar">{t.initial}</div>
              <div>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
              <div className="stars">★★★★★</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
