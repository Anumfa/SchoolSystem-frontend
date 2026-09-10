import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import PageBanner from '../components/PageBanner.jsx';
import api from '../api.js';
import './PageStyles.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // 1) Always save the message so it shows up in the admin panel inbox
    let stored = false;
    try {
      await api.post('/contact', form);
      stored = true;
    } catch (err) {
      console.error('Could not save contact message:', err);
    }

    // 2) Also try to email it via EmailJS
    let emailed = false;
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          subject: form.subject || 'No subject',
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      emailed = true;
    } catch (err) {
      console.error('EmailJS error:', err);
    }

    if (stored || emailed) {
      setStatus({ type: 'success', msg: '✅ Message sent successfully! We will get back to you soon.' });
      setForm(emptyForm);
    } else {
      setStatus({ type: 'error', msg: '⚠️ Message could not be sent. Please try again later.' });
    }

    setLoading(false);
  };

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Have a question? We'd love to hear from you. Reach out to the BFHS team anytime."
      />

      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-tag">Get in Touch</span>
            <h2 className="section-title">We're Here to Help</h2>
          </div>

          <div className="contact-grid">
            {/* Info */}
            <div>
              <div className="card contact-info-card fade-up">
                <h3 className="mb-2">📞 Contact Information</h3>
                <div className="contact-info-item">
                  <div className="contact-info-icon">📍</div>
                  <div>
                    <strong>Visit Us</strong>
                    <p>123 Education Street,<br />Lahore, Punjab, Pakistan</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">📞</div>
                  <div>
                    <strong>Call Us</strong>
                    <p>+92 300 1234567<br />+92 42 3551 2345</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">✉️</div>
                  <div>
                    <strong>Email Us</strong>
                    <p>info@bfhs.edu.pk<br />admissions@bfhs.edu.pk</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">🕒</div>
                  <div>
                    <strong>Office Hours</strong>
                    <p>Mon - Sat: 8:00 AM – 2:30 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="card fade-up">
                <div className="map-placeholder">
                  <div style={{ fontSize: '3rem' }}>🗺️</div>
                  <p>Find Us on the Map</p>
                  <p style={{ fontSize: '0.82rem' }}>123 Education Street, Lahore, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="card fade-up" onSubmit={handleSubmit}>
              <h3 className="mb-2">Send Us a Message</h3>
              {status && <div className={`alert alert-${status.type}`}>{status.msg}</div>}
              <div className="form-group">
                <label>Your Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" />
              </div>
              <div className="form-group">
                <label>Your Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
              </div>              <div className="form-group">
                <label>Phone (optional)</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567" />
              </div>              <div className="form-group">
                <label>Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Admission enquiry" />
              </div>
              <div className="form-group">
                <label>Your Message *</label>
                <textarea name="message" rows="5" value={form.message} onChange={handleChange} required placeholder="Type your message here…" />
              </div>
              <button type="submit" className="btn btn-green" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
