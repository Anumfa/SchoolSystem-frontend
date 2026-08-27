import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';
import './PageStyles.css';
import './Portal.css';

const StudentPortal = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('bfhs_user') || 'null'));
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      api
        .post('/auth/me', { userId: user._id, role: 'student' })
        .then((res) => setProfile(res.data))
        .catch(() => {});
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password, role: 'student' });
      localStorage.setItem('bfhs_token', data.token);
      localStorage.setItem('bfhs_user', JSON.stringify(data));
      setUser(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bfhs_token');
    localStorage.removeItem('bfhs_user');
    setUser(null);
    setProfile(null);
  };

  if (!user || user.role !== 'student') {
    return (
      <section className="auth-section">
        <div className="container">
          <div className="auth-card fade-up">
            <div className="auth-head">
              <div className="auth-icon">🎓</div>
              <h2>Student Portal</h2>
              <p>Log in to view your marks, attendance & profile</p>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="student@bfhs.edu.pk" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
              </div>
              <button type="submit" className="btn btn-green" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Logging in…' : 'Login to Portal →'}
              </button>
            </form>
            <div className="auth-hint">
              Demo student login: <strong>ali@bfhs.edu.pk</strong> / <strong>student123</strong>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Dashboard
  const p = profile || {};
  const totalMarks = (p.marks || []).reduce((acc, m) => acc + (m.final || 0), 0);
  const avg = p.marks?.length ? Math.round(totalMarks / p.marks.length) : 0;

  return (
    <section className="section" style={{ minHeight: '70vh' }}>
      <div className="container">
        <div className="portal-head fade-up">
          <div className="portal-welcome">
            <div className="portal-avatar">{(p.name || user.name || 'S')[0]}</div>
            <div>
              <h2>Welcome, {p.name || user.name} 👋</h2>
              <p>
                {p.rollNo} · {p.className}-{p.section} · {p.email}
              </p>
            </div>
          </div>
          <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
        </div>

        <div className="portal-stats">
          <div className="portal-stat card">
            <span className="portal-stat-icon">📚</span>
            <strong>{p.className || '—'}</strong>
            <span>Class</span>
          </div>
          <div className="portal-stat card">
            <span className="portal-stat-icon">📊</span>
            <strong>{avg}%</strong>
            <span>Average Marks</span>
          </div>
          <div className="portal-stat card">
            <span className="portal-stat-icon">✅</span>
            <strong>{p.attendance || 0}%</strong>
            <span>Attendance</span>
          </div>
          <div className="portal-stat card">
            <span className="portal-stat-icon">🩸</span>
            <strong>{p.bloodGroup || '—'}</strong>
            <span>Blood Group</span>
          </div>
        </div>

        <div className="portal-grid">
          <div className="card fade-up">
            <h3 className="mb-2">📖 My Marks & Grades</h3>
            {p.marks?.length ? (
              <table className="fee-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Midterm</th>
                    <th>Final</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {p.marks.map((m, i) => (
                    <tr key={i}>
                      <td>{m.subject}</td>
                      <td>{m.midterm}</td>
                      <td>{m.final}</td>
                      <td><span className="grade-badge">{m.grade}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: 'var(--gray)' }}>No marks available yet.</p>
            )}
          </div>

          <div className="card fade-up">
            <h3 className="mb-2">👤 My Profile</h3>
            <div className="profile-list">
              <div><span>Father's Name</span><strong>{p.fatherName}</strong></div>
              <div><span>Date of Birth</span><strong>{p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString('en-GB') : '—'}</strong></div>
              <div><span>Gender</span><strong>{p.gender}</strong></div>
              <div><span>Phone</span><strong>{p.phone}</strong></div>
              <div><span>Guardian Phone</span><strong>{p.guardianPhone}</strong></div>
              <div><span>Address</span><strong>{p.address}</strong></div>
              <div><span>Admission Date</span><strong>{p.admissionDate ? new Date(p.admissionDate).toLocaleDateString('en-GB') : '—'}</strong></div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="/events" className="btn btn-gold">View School Events →</Link>
        </div>
      </div>
    </section>
  );
};

export default StudentPortal;
