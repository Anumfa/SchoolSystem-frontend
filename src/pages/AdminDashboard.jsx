import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api.js';
import './PageStyles.css';
import './Portal.css';
import './AdminDashboard.css';

// Artwork that ships with the site — offered as one-click picks in the admin forms
const sampleImages = [
  { label: 'Campus Building', value: '/gallery/campus-building.svg' },
  { label: 'Sports Gala', value: '/gallery/sports-gala.svg' },
  { label: 'Science Lab', value: '/gallery/science-lab.svg' },
  { label: 'Independence Day', value: '/gallery/independence-day.svg' },
  { label: 'Smart Classroom', value: '/gallery/smart-classroom.svg' },
  { label: 'Library', value: '/gallery/library.svg' },
  { label: 'Computer Lab', value: '/gallery/computer-lab.svg' },
  { label: 'Arts Exhibition', value: '/gallery/arts-exhibition.svg' },
];

const eventCategories = ['Sports', 'Academics', 'Cultural', 'Annual', 'Religious', 'Other'];
const eventStatuses = ['upcoming', 'ongoing', 'completed'];
const galleryCategories = ['Campus', 'Events', 'Sports', 'Classrooms', 'Other'];

const emptyEvent = {
  title: '',
  description: '',
  date: '',
  time: '',
  venue: '',
  category: 'Sports',
  status: 'upcoming',
  image: '',
  featured: false,
};

const emptyGalleryItem = { title: '', category: 'Campus', image: '', description: '' };

const ImagePicker = ({ onPick }) => (
  <div className="image-picker">
    <span className="image-picker-hint">Ya phir neeche se koi sample image chunein:</span>
    <div className="image-picker-grid">
      {sampleImages.map((img) => (
        <button
          key={img.value}
          type="button"
          className="image-pick"
          title={img.label}
          onClick={() => onPick(img.value)}
        >
          <img src={img.value} alt={img.label} loading="lazy" />
        </button>
      ))}
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('bfhs_user') || 'null'));
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [events, setEvents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [tab, setTab] = useState('overview');
  const [toast, setToast] = useState('');
  const [selected, setSelected] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [galleryForm, setGalleryForm] = useState(emptyGalleryItem);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
      return;
    }
    api.get('/students').then((r) => setStudents(r.data)).catch(() => {});
    api.get('/teachers').then((r) => setTeachers(r.data)).catch(() => {});
    api.get('/events').then((r) => setEvents(r.data)).catch(() => {});
    api.get('/admissions').then((r) => setAdmissions(r.data)).catch(() => {});
    api.get('/gallery').then((r) => setGallery(r.data)).catch(() => {});
    api.get('/reviews/all').then((r) => setReviews(r.data)).catch(() => {});
    api.get('/contact').then((r) => setMessages(r.data)).catch(() => {});
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem('bfhs_token');
    localStorage.removeItem('bfhs_user');
    navigate('/');
  };

  const updateAdmission = async (id, status) => {
    try {
      await api.put(`/admissions/${id}`, { status });
      setAdmissions((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
      setSelected((cur) => (cur && cur._id === id ? { ...cur, status } : cur));
      setToast(`Application marked as ${status} ✅`);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to update ❌');
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
      setToast('Event deleted 🗑️');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to delete ❌');
    }
  };

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const createEvent = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.post('/events', eventForm);
      setEvents((prev) => [...prev, data].sort((a, b) => new Date(a.date) - new Date(b.date)));
      setEventForm(emptyEvent);
      notify('Event added ✅');
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to add event ❌');
    } finally {
      setSaving(false);
    }
  };

  const createGalleryItem = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.post('/gallery', { ...galleryForm, order: gallery.length });
      setGallery((prev) => [...prev, data]);
      setGalleryForm(emptyGalleryItem);
      notify('Gallery image added ✅');
    } catch (err) {
      notify(err.response?.data?.message || 'Failed to add image ❌');
    } finally {
      setSaving(false);
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      await api.delete(`/gallery/${id}`);
      setGallery((prev) => prev.filter((g) => g._id !== id));
      notify('Gallery image deleted 🗑️');
    } catch (err) {
      notify('Failed to delete ❌');
    }
  };

  const setReviewStatus = async (id, status) => {
    try {
      await api.put(`/reviews/${id}`, { status });
      setReviews((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
      notify(`Review marked as ${status} ✅`);
    } catch (err) {
      notify('Failed to update ❌');
    }
  };

  const deleteReview = async (id) => {
    try {
      await api.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      notify('Review deleted 🗑️');
    } catch (err) {
      notify('Failed to delete ❌');
    }
  };

  const setMessageStatus = async (id, status, silent) => {
    try {
      await api.put(`/contact/${id}`, { status });
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
      setSelectedMessage((cur) => (cur && cur._id === id ? { ...cur, status } : cur));
      if (!silent) notify(`Message marked as ${status} ✅`);
    } catch (err) {
      if (!silent) notify('Failed to update ❌');
    }
  };

  // Opening a message marks it as read
  const openMessage = (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'new') setMessageStatus(msg._id, 'read', true);
  };

  const deleteMessage = async (id) => {
    try {
      await api.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      setSelectedMessage((cur) => (cur && cur._id === id ? null : cur));
      notify('Message deleted 🗑️');
    } catch (err) {
      notify('Failed to delete ❌');
    }
  };

  if (!user || user.role !== 'admin') return null;

  const pendingCount = admissions.filter((a) => a.status === 'pending').length;
  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date()).length;

  return (
    <section className="section" style={{ minHeight: '70vh' }}>
      <div className="container">
        {toast && <div className="alert alert-success">{toast}</div>}

        <div className="portal-head fade-up">
          <div className="portal-welcome">
            <div className="portal-avatar">{(user.name || 'A')[0]}</div>
            <div>
              <h2>Admin Dashboard</h2>
              <p>{user.name} · {user.email} · System Administrator</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/" className="btn btn-outline">View Website</Link>
            <button className="btn btn-green" onClick={logout}>Logout</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="event-filter">
          {[
            ['overview', '📊 Overview'],
            ['students', `👨‍🎓 Students (${students.length})`],
            ['teachers', `👩‍🏫 Teachers (${teachers.length})`],
            ['admissions', `📋 Applications (${admissions.length})`],
            ['events', `📅 Events (${events.length})`],
            ['gallery', `🖼️ Gallery (${gallery.length})`],
            ['reviews', `⭐ Reviews (${reviews.filter((r) => r.status === 'pending').length})`],
            ['messages', `✉️ Messages (${messages.filter((m) => m.status === 'new').length})`],
          ].map(([key, label]) => (
            <button key={key} className={`filter-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <>
            <div className="portal-stats">
              <div className="portal-stat card"><span className="portal-stat-icon">👨‍🎓</span><strong>{students.length}</strong><span>Total Students</span></div>
              <div className="portal-stat card"><span className="portal-stat-icon">👩‍🏫</span><strong>{teachers.length}</strong><span>Teachers</span></div>
              <div className="portal-stat card"><span className="portal-stat-icon">📥</span><strong>{pendingCount}</strong><span>Pending Applications</span></div>
              <div className="portal-stat card"><span className="portal-stat-icon">📅</span><strong>{upcomingEvents}</strong><span>Upcoming Events</span></div>
            </div>
            <div className="card">
              <h3 className="mb-2">📋 Recent Admission Applications</h3>
              {admissions.length === 0 ? (
                <p style={{ color: 'var(--gray)' }}>No applications yet.</p>
              ) : (
                <table className="fee-table">
                  <thead>
                    <tr><th>Student</th><th>Class</th><th>Phone</th><th>Email</th><th>Status</th><th>Details</th></tr>
                  </thead>
                  <tbody>
                    {admissions.slice(0, 5).map((a) => (
                      <tr key={a._id}>
                        <td>{a.studentName}</td>
                        <td>{a.classApplyingFor}</td>
                        <td><a className="contact-link" href={`tel:${a.phone}`}>{a.phone}</a></td>
                        <td><a className="contact-link" href={`mailto:${a.email}`}>{a.email}</a></td>
                        <td>
                          <span className={`status-chip ${a.status}`}>{a.status}</span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn view" title="View full details" onClick={() => setSelected(a)}>👁️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Students */}
        {tab === 'students' && (
          <div className="card">
            <h3 className="mb-2">👨‍🎓 All Students</h3>
            <table className="fee-table">
              <thead>
                <tr><th>Roll No</th><th>Name</th><th>Class</th><th>Attendance</th><th>Contact</th></tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.rollNo}</td>
                    <td>{s.name}</td>
                    <td>{s.className}-{s.section}</td>
                    <td>{s.attendance}%</td>
                    <td>{s.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Teachers */}
        {tab === 'teachers' && (
          <div className="card">
            <h3 className="mb-2">👩‍🏫 All Teachers</h3>
            <table className="fee-table">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Subject</th><th>Qualification</th><th>Experience</th></tr>
              </thead>
              <tbody>
                {teachers.map((t) => (
                  <tr key={t._id}>
                    <td>{t.teacherId}</td>
                    <td>{t.name}</td>
                    <td>{t.subject}</td>
                    <td>{t.qualification}</td>
                    <td>{t.experience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Admissions */}
        {tab === 'admissions' && (
          <div className="card">
            <h3 className="mb-2">📋 Admission Applications</h3>
            <table className="fee-table">
              <thead>
                <tr><th>Student</th><th>Class</th><th>Parent</th><th>Phone</th><th>Email</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {admissions.map((a) => (
                  <tr key={a._id}>
                    <td>{a.studentName}</td>
                    <td>{a.classApplyingFor}</td>
                    <td>{a.fatherName}</td>
                    <td><a className="contact-link" href={`tel:${a.phone}`}>{a.phone}</a></td>
                    <td><a className="contact-link" href={`mailto:${a.email}`}>{a.email}</a></td>
                    <td><span className={`status-chip ${a.status}`}>{a.status}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn view" title="View full details" onClick={() => setSelected(a)}>👁️</button>
                        <button className="action-btn approve" title="Approve" onClick={() => updateAdmission(a._id, 'approved')}>✓</button>
                        <button className="action-btn interview" title="Interview" onClick={() => updateAdmission(a._id, 'interview')}>👥</button>
                        <button className="action-btn reject" title="Reject" onClick={() => updateAdmission(a._id, 'rejected')}>✗</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Events */}
        {tab === 'events' && (
          <>
            <div className="card admin-form-card">
              <h3 className="mb-2">➕ Add New Event</h3>
              <form className="admin-form" onSubmit={createEvent}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Event Title *</label>
                    <input
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      required
                      placeholder="e.g. Annual Sports Gala 2027"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Time</label>
                    <input
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      placeholder="e.g. 9:00 AM"
                    />
                  </div>
                  <div className="form-group">
                    <label>Venue</label>
                    <input
                      value={eventForm.venue}
                      onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                      placeholder="e.g. School Ground"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    >
                      {eventCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={eventForm.status}
                      onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}
                    >
                      {eventStatuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows="3"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    placeholder="Short description shown on the Events page"
                  />
                </div>

                <div className="form-group">
                  <label>Image</label>
                  <input
                    value={eventForm.image}
                    onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                    placeholder="/gallery/sports-gala.svg  or  https://..."
                  />
                  <ImagePicker onPick={(v) => setEventForm({ ...eventForm, image: v })} />
                  {eventForm.image && (
                    <img className="admin-image-preview" src={eventForm.image} alt="Event preview" />
                  )}
                </div>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={eventForm.featured}
                    onChange={(e) => setEventForm({ ...eventForm, featured: e.target.checked })}
                  />
                  <span>Home page par featured dikhayein</span>
                </label>

                <button type="submit" className="btn btn-green" disabled={saving}>
                  {saving ? 'Saving…' : 'Add Event →'}
                </button>
              </form>
            </div>

            <div className="card">
              <h3 className="mb-2">📅 All Events ({events.length})</h3>
              <table className="fee-table">
                <thead>
                  <tr><th>Image</th><th>Title</th><th>Category</th><th>Date</th><th>Venue</th><th>Status</th><th>Delete</th></tr>
                </thead>
                <tbody>
                  {events.map((e) => (
                    <tr key={e._id}>
                      <td>{e.image ? <img className="admin-thumb" src={e.image} alt={e.title} loading="lazy" /> : '—'}</td>
                      <td>{e.title}</td>
                      <td>{e.category}</td>
                      <td>{new Date(e.date).toLocaleDateString('en-GB')}</td>
                      <td>{e.venue}</td>
                      <td><span className="status-chip">{e.status}</span></td>
                      <td><button className="action-btn reject" title="Delete event" onClick={() => deleteEvent(e._id)}>🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Gallery */}
        {tab === 'gallery' && (
          <>
            <div className="card admin-form-card">
              <h3 className="mb-2">➕ Add Gallery Image</h3>
              <form className="admin-form" onSubmit={createGalleryItem}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                      required
                      placeholder="e.g. Annual Prize Distribution"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    >
                      {galleryCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Image URL / Path *</label>
                  <input
                    value={galleryForm.image}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                    required
                    placeholder="/gallery/library.svg  or  https://..."
                  />
                  <ImagePicker onPick={(v) => setGalleryForm({ ...galleryForm, image: v })} />
                  {galleryForm.image && (
                    <img className="admin-image-preview" src={galleryForm.image} alt="Gallery preview" />
                  )}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    placeholder="Lightbox me dikhne wala text"
                  />
                </div>

                <button type="submit" className="btn btn-green" disabled={saving}>
                  {saving ? 'Saving…' : 'Add Image →'}
                </button>
              </form>
            </div>

            <div className="card">
              <h3 className="mb-2">🖼️ Gallery Images ({gallery.length})</h3>
              {gallery.length === 0 ? (
                <p style={{ color: 'var(--gray)' }}>No gallery images yet — pehli image upar se add karein.</p>
              ) : (
                <div className="admin-gallery-grid">
                  {gallery.map((g) => (
                    <div key={g._id} className="admin-gallery-item">
                      {g.image ? (
                        <img src={g.image} alt={g.title} loading="lazy" />
                      ) : (
                        <div className="admin-gallery-noimg">No image</div>
                      )}
                      <div className="admin-gallery-meta">
                        <strong>{g.title}</strong>
                        <span>{g.category}</span>
                      </div>
                      <button
                        className="action-btn reject"
                        title="Delete image"
                        onClick={() => deleteGalleryItem(g._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Reviews */}
        {tab === 'reviews' && (
          <div className="card">
            <h3 className="mb-2">⭐ Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p style={{ color: 'var(--gray)' }}>No reviews submitted yet.</p>
            ) : (
              <table className="fee-table">
                <thead>
                  <tr><th>Name</th><th>Role</th><th>Rating</th><th>Review</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr key={r._id}>
                      <td>{r.name}</td>
                      <td>{r.role}</td>
                      <td><span className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span></td>
                      <td className="review-cell">{r.message}</td>
                      <td><span className={`status-chip ${r.status}`}>{r.status}</span></td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn approve" title="Approve (show on website)" onClick={() => setReviewStatus(r._id, 'approved')}>✓</button>
                          <button className="action-btn reject" title="Reject" onClick={() => setReviewStatus(r._id, 'rejected')}>✗</button>
                          <button className="action-btn view" title="Delete" onClick={() => deleteReview(r._id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Contact messages */}
        {tab === 'messages' && (
          <div className="card">
            <h3 className="mb-2">✉️ Contact Messages ({messages.length})</h3>
            {messages.length === 0 ? (
              <p style={{ color: 'var(--gray)' }}>
                No messages yet — website ke Contact form se aane wale messages yahan dikhenge.
              </p>
            ) : (
              <table className="fee-table">
                <thead>
                  <tr><th>From</th><th>Contact</th><th>Subject</th><th>Message</th><th>Received</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m._id} className={m.status === 'new' ? 'row-new' : ''}>
                      <td>{m.name}</td>
                      <td>
                        <a className="contact-link" href={`mailto:${m.email}`}>{m.email}</a>
                        {m.phone && (
                          <>
                            <br />
                            <a className="contact-link" href={`tel:${m.phone}`}>{m.phone}</a>
                          </>
                        )}
                      </td>
                      <td>{m.subject || '—'}</td>
                      <td className="review-cell">{m.message}</td>
                      <td>{m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-GB') : '—'}</td>
                      <td><span className={`status-chip ${m.status}`}>{m.status}</span></td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn view" title="View full details" onClick={() => openMessage(m)}>👁️</button>
                          <button className="action-btn reject" title="Delete" onClick={() => deleteMessage(m._id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>📋 Admission Application Details</h3>
              <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details">✕</button>
            </div>

            <div className="detail-grid">
              <div className="detail-item"><span>Student Name</span><strong>{selected.studentName}</strong></div>
              <div className="detail-item"><span>Class Applied For</span><strong>{selected.classApplyingFor}</strong></div>
              <div className="detail-item"><span>Father's Name</span><strong>{selected.fatherName || '—'}</strong></div>
              <div className="detail-item"><span>Mother's Name</span><strong>{selected.motherName || '—'}</strong></div>
              <div className="detail-item"><span>Date of Birth</span><strong>{selected.dateOfBirth ? new Date(selected.dateOfBirth).toLocaleDateString('en-GB') : '—'}</strong></div>
              <div className="detail-item"><span>Gender</span><strong>{selected.gender || '—'}</strong></div>
              <div className="detail-item"><span>Phone</span><strong>{selected.phone ? <a className="contact-link" href={`tel:${selected.phone}`}>{selected.phone}</a> : '—'}</strong></div>
              <div className="detail-item"><span>Email</span><strong>{selected.email ? <a className="contact-link" href={`mailto:${selected.email}`}>{selected.email}</a> : '—'}</strong></div>
              <div className="detail-item"><span>Previous School</span><strong>{selected.previousSchool || '—'}</strong></div>
              <div className="detail-item"><span>Last Class Marks / Grade</span><strong>{selected.lastMarks || '—'}</strong></div>
              <div className="detail-item full"><span>Home Address</span><strong>{selected.address || '—'}</strong></div>
              <div className="detail-item"><span>Applied On</span><strong>{selected.createdAt ? new Date(selected.createdAt).toLocaleString('en-GB') : '—'}</strong></div>
              <div className="detail-item"><span>Current Status</span><strong><span className={`status-chip ${selected.status}`}>{selected.status}</span></strong></div>
            </div>

            {selected.remarks && (
              <div className="detail-note"><span>Remarks</span><strong>{selected.remarks}</strong></div>
            )}

            <div className="modal-actions">
              <button className="btn btn-green" onClick={() => updateAdmission(selected._id, 'approved')}>✓ Approve</button>
              <button className="btn btn-outline" onClick={() => updateAdmission(selected._id, 'interview')}>👥 Interview</button>
              <button className="btn btn-outline" onClick={() => updateAdmission(selected._id, 'rejected')}>✗ Reject</button>
            </div>
          </div>
        </div>
      )}

      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>✉️ Message Details</h3>
              <button className="modal-close" onClick={() => setSelectedMessage(null)} aria-label="Close details">✕</button>
            </div>

            <div className="detail-grid">
              <div className="detail-item"><span>From</span><strong>{selectedMessage.name}</strong></div>
              <div className="detail-item"><span>Received</span><strong>{selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString('en-GB') : '—'}</strong></div>
              <div className="detail-item"><span>Email</span><strong><a className="contact-link" href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a></strong></div>
              <div className="detail-item"><span>Phone</span><strong>{selectedMessage.phone ? <a className="contact-link" href={`tel:${selectedMessage.phone}`}>{selectedMessage.phone}</a> : '—'}</strong></div>
              <div className="detail-item"><span>Subject</span><strong>{selectedMessage.subject || '—'}</strong></div>
              <div className="detail-item"><span>Status</span><strong><span className={`status-chip ${selectedMessage.status}`}>{selectedMessage.status}</span></strong></div>
              <div className="detail-item full"><span>Message</span><strong>{selectedMessage.message}</strong></div>
            </div>

            <div className="modal-actions">
              <a
                className="btn btn-green"
                href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(`RE: ${selectedMessage.subject || 'Your enquiry'}`)}`}
              >
                ✉️ Reply by Email
              </a>
              <button className="btn btn-outline" onClick={() => setMessageStatus(selectedMessage._id, 'replied')}>✓ Mark as Replied</button>
              <button className="btn btn-outline" onClick={() => setMessageStatus(selectedMessage._id, 'new')}>Mark Unread</button>
              <button className="btn btn-outline" onClick={() => deleteMessage(selectedMessage._id)}>🗑️ Delete</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
