import React from 'react';
import './Stats.css';

const stats = [
  { num: '1200+', label: 'Students Enrolled' },
  { num: '75+', label: 'Expert Teachers' },
  { num: '25+', label: 'Years of Excellence' },
  { num: '98%', label: 'Board Success Rate' },
];

const Stats = () => (
  <section className="stats">
    <div className="container stats-grid">
      {stats.map((s) => (
        <div key={s.label} className="stat-item fade-up">
          <span className="stat-num">{s.num}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
