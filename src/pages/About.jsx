import React from 'react';
import PageBanner from '../components/PageBanner.jsx';
import SchoolScene from '../components/SchoolScene.jsx';
import Stats from '../components/Stats.jsx';
import './PageStyles.css';

const values = [
  { icon: '🎯', title: 'Our Mission', desc: 'To provide high-quality education that builds strong character, critical thinking, and a lifelong love of learning in every student.' },
  { icon: '🌟', title: 'Our Vision', desc: 'To be a leading institution that nurtures confident, compassionate, and capable leaders who contribute positively to society.' },
  { icon: '⚖️', title: 'Our Values', desc: 'Integrity, respect, discipline, and excellence guide everything we do — in classrooms, on the field, and in our community.' },
];

const milestones = [
  { year: '2001', title: 'Our Foundation', desc: 'Bright Future High School opened its doors with 120 students and a bold vision for quality education in Lahore.' },
  { year: '2008', title: 'Middle Section Added', desc: 'Expanded to include Grades 6-8 with new science and computer laboratories.' },
  { year: '2014', title: 'Matriculation Program', desc: 'Launched the Matriculation program with consistently outstanding board results.' },
  { year: '2020', title: 'Smart Classrooms', desc: 'Upgraded all classrooms with modern smart boards and digital learning resources.' },
  { year: '2026', title: '1,200+ Students', desc: 'Today we proudly serve over 1,200 students with 75+ dedicated faculty members.' },
];

const About = () => (
  <>
    <PageBanner
      title="About Us"
      subtitle="Nurturing Minds, Inspiring Excellence — get to know the heart of Bright Future High School."
    />

    {/* Story section */}
    <section className="section">
      <div className="container about-grid">
        <div className="about-text fade-up">
          <span className="section-tag">Our Story</span>
          <h2 className="section-title">A Legacy of Learning Since 2001</h2>
          <p className="about-lead">
            Bright Future High School is committed to providing a safe, inclusive, and challenging
            environment where every student is empowered to achieve academic excellence and personal growth.
          </p>
          <p className="about-body">
            Founded in 2001, BFHS has grown from a single block of classrooms into a thriving campus
            with modern laboratories, a well-stocked library, spacious sports grounds, and dedicated
            faculty. Our holistic approach balances rigorous academics with sports, arts, and
            character-building programs — because we believe every child has a bright future worth nurturing.
          </p>
          <p className="about-body">
            Over the past 25 years, thousands of our alumni have gone on to excel in medicine,
            engineering, business, and public service — a proud testament to the quality of education
            and values we instil.
          </p>
          <div className="story-buttons">
            <a href="#mission" className="btn btn-green">Explore Our Mission</a>
            <a href="/admissions" className="btn btn-outline">Apply Now →</a>
          </div>
        </div>
        <div className="about-visual fade-up">
          <div className="about-photo">
            <SchoolScene width={560} />
          </div>
        </div>
      </div>
    </section>

    {/* Mission / Vision / Values */}
    <section id="mission" className="section values-section">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-tag">What We Stand For</span>
          <h2 className="section-title">Mission, Vision & Values</h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={v.title} className="value-card card fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Stats />

    {/* Timeline / milestones */}
    <section className="section">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-tag">Our Journey</span>
          <h2 className="section-title">25 Years of Milestones</h2>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={m.year} className={`timeline-item ${i % 2 ? 'left' : 'right'} fade-up`}>
              <div className="timeline-dot">{m.year}</div>
              <div className="timeline-card card">
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
