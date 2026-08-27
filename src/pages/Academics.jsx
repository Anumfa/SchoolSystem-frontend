import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import api from '../api.js';
import './PageStyles.css';

const subjects = [
  { icon: '📖', name: 'English', tag: 'Language & Literature' },
  { icon: '🔢', name: 'Mathematics', tag: 'Numbers & Logic' },
  { icon: '🔬', name: 'General Science', tag: 'Hands-on Discovery' },
  { icon: '💻', name: 'Computer Science', tag: 'Digital Skills' },
  { icon: '🌍', name: 'Social Studies', tag: 'History & Geography' },
  { icon: '🕌', name: 'Islamiyat', tag: 'Moral Education' },
  { icon: '📝', name: 'Urdu', tag: 'Language & Literature' },
  { icon: '🎨', name: 'Arts & Crafts', tag: 'Creativity & Design' },
  { icon: '⚽', name: 'Physical Education', tag: 'Sports & Fitness' },
];

const defaultCourses = [
  {
    title: 'Primary Section (KG - Grade 5)',
    code: 'PRM',
    description: 'Foundational learning focusing on literacy, numeracy, and character building in a fun, safe environment.',
    subjects: ['English', 'Urdu', 'Mathematics', 'General Science', 'Islamiyat'],
    duration: '6 Years',
    fee: 8500,
  },
  {
    title: 'Middle Section (Grade 6 - 8)',
    code: 'MID',
    description: 'Strengthening core concepts with science labs, computer lab, and activity-based learning.',
    subjects: ['English', 'Urdu', 'Mathematics', 'Science', 'Computer Science'],
    duration: '3 Years',
    fee: 10000,
  },
  {
    title: 'Matriculation (Grade 9 - 10)',
    code: 'MAT',
    description: 'Board exam preparation with experienced faculty, mock tests, and career counselling.',
    subjects: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    duration: '2 Years',
    fee: 12500,
  },
];

const Academics = () => {
  const [courses, setCourses] = useState(defaultCourses);

  useEffect(() => {
    api
      .get('/courses')
      .then((res) => {
        if (res.data && res.data.length) setCourses(res.data);
      })
      .catch(() => setCourses(defaultCourses));
  }, []);

  return (
    <>
      <PageBanner
        title="Academics"
        subtitle="A comprehensive curriculum from KG to Matriculation, designed to build strong foundations for lifelong success."
      />

      <section className="section">
        <div className="container">
          <div className="academics-hero fade-up">
            <h2>📚 Our Academic Programs</h2>
            <p>
              BFHS offers a balanced, modern curriculum aligned with national standards — combining
              academics, technology, sports, and moral education for complete development.
            </p>
          </div>

          <div className="text-center mb-4">
            <span className="section-tag">Programs</span>
            <h2 className="section-title">Choose the Right Track</h2>
          </div>

          <div className="courses-grid">
            {courses.map((c, i) => (
              <div key={c.code + i} className="course-card card fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
                <span className="course-code">{c.code}</span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <div className="subject-list">
                  {c.subjects?.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="course-meta">
                  <span>⏳ {c.duration}</span>
                  <span>💵 PKR {Number(c.fee).toLocaleString()}/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-tag">Curriculum</span>
            <h2 className="section-title">Subjects We Teach</h2>
          </div>
          <div className="subjects-grid">
            {subjects.map((s, i) => (
              <div key={s.name} className="subject-card fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="subject-icon">{s.icon}</div>
                <div>
                  <strong>{s.name}</strong>
                  <span>{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-tag">Beyond Academics</span>
            <h2 className="section-title">Co-Curricular Activities</h2>
          </div>
          <div className="values-grid">
            {[
              { icon: '🏅', title: 'Sports', desc: 'Cricket, football, athletics, badminton & annual sports gala.' },
              { icon: '🎭', title: 'Arts & Culture', desc: 'Drama, debates, naat competitions & national day celebrations.' },
              { icon: '🧪', title: 'Clubs & Societies', desc: 'Science club, computer club, quiz team & student council.' },
              { icon: '📚', title: 'Study Tours', desc: 'Educational trips and museum visits that bring learning to life.' },
              { icon: '🤝', title: 'Community Service', desc: 'Charity drives and volunteer programs building compassion.' },
              { icon: '🧠', title: 'Career Counselling', desc: 'Guidance sessions helping students choose the right future path.' },
            ].map((a, i) => (
              <div key={a.title} className="value-card card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="value-icon">{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Academics;
