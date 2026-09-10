import React, { useEffect, useState } from 'react';
import api from '../api.js';
import './Testimonials.css';

// Shown while loading, or if the backend has no approved reviews yet
const fallbackTestimonials = [
  {
    quote:
      'BFHS has transformed my son into a confident, disciplined learner. The teachers genuinely care about every child’s progress.',
    name: 'Mrs. Nadia Aslam',
    role: 'Parent of Grade 8 Student',
    rating: 5,
  },
  {
    quote:
      'The science labs and computer education here are outstanding. My daughter won first prize in the city science exhibition!',
    name: 'Mr. Imran Sheikh',
    role: 'Parent of Grade 10 Student',
    rating: 5,
  },
  {
    quote:
      'A wonderful, safe environment with excellent academics and character building. Proud to be part of the BFHS family.',
    name: 'Mrs. Saira Batool',
    role: 'Alumna & Parent',
    rating: 5,
  },
];

const ROLE_OPTIONS = ['Parent', 'Alumnus / Alumna', 'Student', 'Teacher', 'Other'];

const emptyForm = { name: '', role: 'Parent', rating: 5, message: '' };

const Stars = ({ rating }) => (
  <div className="stars" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} className={n <= rating ? 'on' : ''}>★</span>
    ))}
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api
      .get('/reviews')
      .then((res) => {
        // Use approved reviews from the API whenever there are any
        const list = Array.isArray(res.data) ? res.data : [];
        if (list.length) setTestimonials(list);
      })
      .catch(() => {
        // keep the built-in testimonials
      });
  }, []);

  const closeModal = () => {
    setOpen(false);
    setStatus(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await api.post('/reviews', form);
      setStatus({
        type: 'success',
        msg: `Thank you, ${form.name.trim()}! Your review has been sent — it will appear here once our team approves it. ⭐`,
      });
      setForm(emptyForm);
    } catch (err) {
      setStatus({
        type: 'error',
        msg: err.response?.data?.message || 'Could not submit your review. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
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
            <div
              key={t._id || t.name + i}
              className="testimonial-card fade-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="quote-mark">“</div>
              <p>{t.message || t.quote}</p>
              <div className="testimonial-person">
                <div className="avatar">{(t.name || '?').trim()[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
                <Stars rating={t.rating || 5} />
              </div>
            </div>
          ))}
        </div>

        <div className="review-cta">
          <p>Parent ya student hain? Apna tajurba doosron ke saath share karein.</p>
          <button className="btn btn-gold" onClick={() => setOpen(true)}>✍️ Write a Review</button>
        </div>
      </div>

      {open && (
        <div className="review-modal" onClick={closeModal}>
          <div className="review-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal-head">
              <h3>✍️ Write a Review</h3>
              <button className="review-modal-close" onClick={closeModal} aria-label="Close review form">✕</button>
            </div>

            {status && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {status.msg}
              </div>
            )}

            {status?.type === 'success' ? (
              <button
                className="btn btn-green"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={closeModal}
              >
                Done
              </button>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    maxLength={60}
                    placeholder="e.g. Mrs. Nadia Aslam"
                  />
                </div>

                <div className="form-group">
                  <label>You are</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Rating</label>
                  <div className="stars-input" role="radiogroup" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={form.rating === n}
                        aria-label={`${n} star${n > 1 ? 's' : ''}`}
                        className={`star-btn ${n <= form.rating ? 'on' : ''}`}
                        onClick={() => setForm({ ...form, rating: n })}
                      >
                        ★
                      </button>
                    ))}
                    <span className="stars-value">{form.rating}/5</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review *</label>
                  <textarea
                    rows="4"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    maxLength={600}
                    placeholder="Share your experience with Bright Future High School…"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-green"
                  disabled={saving}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {saving ? 'Submitting…' : 'Submit Review →'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
