import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import api from '../api.js';
import './PageStyles.css';

const defaultTeachers = [
  { name: 'Ms. Ayesha Khan', subject: 'Mathematics', qualification: 'M.Sc Mathematics, M.Ed', experience: '12 years' },
  { name: 'Mr. Bilal Ahmed', subject: 'Physics', qualification: 'M.Phil Physics', experience: '9 years' },
  { name: 'Ms. Sana Tariq', subject: 'English', qualification: 'M.A English, B.Ed', experience: '7 years' },
  { name: 'Mr. Hassan Ali', subject: 'Computer Science', qualification: 'MS Computer Science', experience: '5 years' },
  { name: 'Ms. Rabia Sheikh', subject: 'Chemistry', qualification: 'M.Sc Chemistry', experience: '10 years' },
  { name: 'Mr. Faisal Mehmood', subject: 'Urdu', qualification: 'M.A Urdu', experience: '8 years' },
  { name: 'Ms. Hina Saeed', subject: 'Biology', qualification: 'M.Sc Biology, M.Ed', experience: '6 years' },
  { name: 'Mr. Kamran Yousaf', subject: 'Islamiyat', qualification: 'M.A Islamic Studies', experience: '11 years' },
];

const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('');

const Faculty = () => {
  const [teachers, setTeachers] = useState(defaultTeachers);

  useEffect(() => {
    api
      .get('/teachers')
      .then((res) => {
        if (res.data && res.data.length) setTeachers(res.data);
      })
      .catch(() => setTeachers(defaultTeachers));
  }, []);

  return (
    <>
      <PageBanner
        title="Our Faculty"
        subtitle="Meet the passionate, experienced educators who make learning at BFHS extraordinary."
      />

      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-tag">Meet the Team</span>
            <h2 className="section-title">Our Expert Educators</h2>
            <p className="section-subtitle">
              Every BFHS teacher is carefully selected for their subject expertise, teaching skill,
              and genuine care for students.
            </p>
          </div>

          <div className="faculty-grid">
            {teachers.map((t, i) => (
              <div key={t.name} className="faculty-card card fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="faculty-avatar">{initials(t.name)}</div>
                <h3>{t.name}</h3>
                <div className="faculty-subject">{t.subject}</div>
                <p>
                  {t.qualification}
                  <br />
                  {t.experience} experience
                </p>
                <span className="qualification">✨ Dedicated & Caring</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-tag">Why Our Teachers</span>
            <h2 className="section-title">Dedicated to Every Child's Success</h2>
          </div>
          <div className="values-grid">
            {[
              { icon: '🎓', title: 'Highly Qualified', desc: 'Most of our faculty hold advanced degrees and teaching certifications.' },
              { icon: '📈', title: 'Continuous Training', desc: 'Regular professional development workshops keep teaching methods modern.' },
              { icon: '💛', title: 'Caring Mentors', desc: 'Teachers act as mentors, guiding academics and personal growth alike.' },
              { icon: '🤝', title: 'Parent Partnership', desc: 'Open communication with parents through regular meetings & reports.' },
            ].map((f, i) => (
              <div key={f.title} className="value-card card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="value-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Faculty;
