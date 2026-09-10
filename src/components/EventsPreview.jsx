import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';
import './EventsPreview.css';

const EventsPreview = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/events')
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        const upcoming = list
          .filter((e) => new Date(e.date) >= new Date())
          .slice(0, 3);
        setEvents(upcoming.length ? upcoming : list.slice(0, 3));
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <section className="section events-preview">
      <div className="container">
        <div className="events-head">
          <div>
            <span className="section-tag">School Events</span>
            <h2 className="section-title">Upcoming Activities & Events</h2>
          </div>
          <Link to="/events" className="btn btn-outline">View All Events →</Link>
        </div>

        <div className="events-grid">
          {loading &&
            [0, 1, 2].map((i) => (
              <div key={i} className="event-card card">
                <div className="event-card-img event-skeleton" />
                <h3>Loading events…</h3>
              </div>
            ))}

          {!loading && events.length === 0 && (
            <p className="events-empty">
              No upcoming events right now — please check back soon. 🗓️
            </p>
          )}

          {events.map((ev, i) => (
            <div key={ev._id} className="event-card card fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
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
              <p>{ev.description?.slice(0, 90)}…</p>
              <div className="event-meta">
                <span>🕒 {ev.time || 'TBA'}</span>
                <span>📍 {ev.venue}</span>
              </div>
              <Link to="/events" className="event-link">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
