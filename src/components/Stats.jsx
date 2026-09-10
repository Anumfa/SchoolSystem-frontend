import React, { useEffect, useRef, useState } from 'react';
import api from '../api.js';
import './Stats.css';

// Used until the API responds (and if it is unreachable)
const fallbackStats = { students: 1200, teachers: 75, years: 25, successRate: 98 };

const statDefs = [
  { key: 'students', label: 'Students Enrolled', suffix: '+' },
  { key: 'teachers', label: 'Expert Teachers', suffix: '+' },
  { key: 'years', label: 'Years of Excellence', suffix: '+' },
  { key: 'successRate', label: 'Board Success Rate', suffix: '%' },
];

/**
 * Counts from 0 up to `value` the first time it scrolls into view.
 */
const CountUp = ({ value, suffix }) => {
  const [display, setDisplay] = useState(0);
  const nodeRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;

    let frame;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setDisplay(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span className="stat-num" ref={nodeRef}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    api
      .get('/stats')
      .then((res) => {
        const data = res.data;
        if (!data || typeof data !== 'object') return;
        setStats({
          students: Number(data.students) || fallbackStats.students,
          teachers: Number(data.teachers) || fallbackStats.teachers,
          years: Number(data.years) || fallbackStats.years,
          successRate: Number(data.successRate) || fallbackStats.successRate,
        });
      })
      .catch(() => {
        // keep the fallback numbers
      });
  }, []);

  return (
    <section className="stats">
      <div className="container stats-grid">
        {statDefs.map((s) => (
          <div key={s.key} className="stat-item fade-up">
            <CountUp value={stats[s.key]} suffix={s.suffix} />
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
