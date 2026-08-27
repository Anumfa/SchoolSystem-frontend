import React from 'react';
import './Features.css';

const features = [
  {
    icon: '🎓',
    title: 'Quality Education',
    desc: 'A rigorous, modern curriculum from KG to Matriculation that builds strong academic foundations.',
    color: '#15803d',
  },
  {
    icon: '👩‍🏫',
    title: 'Experienced Faculty',
    desc: 'Qualified, caring teachers who inspire curiosity and guide every student to reach their potential.',
    color: '#d97706',
  },
  {
    icon: '🏛️',
    title: 'Modern Facilities',
    desc: 'Science labs, computer lab, library, sports ground, and smart classrooms for hands-on learning.',
    color: '#1d4ed8',
  },
  {
    icon: '🌱',
    title: 'Holistic Development',
    desc: 'Sports, arts, and character-building programs that nurture confident, well-rounded individuals.',
    color: '#9333ea',
  },
];

const Features = () => (
  <section className="section features">
    <div className="container">
      <div className="text-center mb-4">
        <span className="section-tag">Why Choose BFHS</span>
        <h2 className="section-title">Everything Your Child Needs to Shine</h2>
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={f.title} className="feature-card card fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="feature-icon" style={{ background: `${f.color}18`, color: f.color }}>
              {f.icon}
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
