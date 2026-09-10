import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api.js';
import './PageStyles.css';
import './Portal.css';
import './AdminDashboard.css';

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

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
      return;
    }
    api.get('/students').then((r) => setStudents(r.data)).catch(() => {});
    api.get('/teachers').then((r) => setTeachers(r.data)).catch(() => {});
    api.get('/events').then((r) => setEvents(r.data)).catch(() => {});
    api.get('/admissions').then((r) => setAdmissions(r.data)).catch(() => {});
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
          <div className="card">
            <h3 className="mb-2">📅 Manage Events</h3>
            <table className="fee-table">
              <thead>
                <tr><th>Title</th><th>Category</th><th>Date</th><th>Venue</th><th>Status</th><th>Delete</th></tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e._id}>
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
    </section>
  );
};

export default AdminDashboard;
