import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import api from '../api.js';
import './PageStyles.css';
import './Events.css';

const defaultEvents = [
  { _id: '1', title: 'Annual Sports Gala 2026', category: 'Sports', date: '2026-11-20', time: '9:00 AM', venue: 'School Ground', description: 'A fun-filled day of athletics, races, and team sports for all grade levels.' },
  { _id: '2', title: 'Science & Tech Exhibition', category: 'Academics', date: '2026-12-05', time: '10:00 AM', venue: 'Main Hall', description: 'Students showcase innovative science and technology projects.' },
  { _id: '3', title: 'Independence Day Celebration', category: 'Cultural', date: '2026-08-14', time: '8:30 AM', venue: 'School Ground', description: 'Flag hoisting ceremony and cultural performances celebrating 14th August.' },
  { _id: '4', title: 'Parent Teacher Meeting', category: 'Other', date: '2026-09-15', time: '2:00 PM', venue: 'Classrooms', description: 'Quarterly meeting to discuss student progress with parents.' },
  { _id: '5', title: 'Annual Result Day', category: 'Annual', date: '2027-03-30', time: '10:00 AM', venue: 'School Hall', description: 'Distribution of annual examination results and awards ceremony.' },
];

const categories = ['All', 'Sports', 'Academics', 'Cultural', 'Annual', 'Other'];

const Events = () => {
  const [events, setEvents] = useState(defaultEvents);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api
      .get('/events')
      .then((res) => {
        if (res.data && res.data.length) setEvents(res.data);
      })
      .catch(() => setEvents(defaultEvents));
  }, []);

  const items = filter === 'All' ? events : events.filter((e) => e.category === filter);

  return (
    <>
      <PageBanner
        title="Events & Activities"
        subtitle="From sports galas to science fairs — discover the exciting events happening at BFHS."
      />

      <section className="section">
        <div className="container">
          <div className="event-filter">
            {categories.map((c) => (
              <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="event-list-grid">
            {items.map((ev, i) => (
              <div key={ev._id} className="event-card card fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="event-card-top">
                  <div className="event-date-badge">
                    <span className="event-date-day">{new Date(ev.date).getDate()}</span>
                    <span className="event-date-month">
                      {new Date(ev.date).toLocaleDateString('en-GB', { month: 'short' })}
                    </span>
                  </div>
                  <span className="event-cat">{ev.category}</span>
                </div>
                <h3>{ev.title}</h3>
                <p>{ev.description}</p>
                <div className="event-meta">
                  <span>🕒 {ev.time || 'TBA'}</span>
                  <span>📍 {ev.venue}</span>
                </div>
                <div className="event-status">
                  {new Date(ev.date) >= new Date() ? (
                    <span className="status-upcoming">● Upcoming</span>
                  ) : (
                    <span className="status-completed">✓ Completed</span>
                  )}
                  <span className="event-year">{new Date(ev.date).getFullYear()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
