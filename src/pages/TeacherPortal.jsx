import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';
import './PageStyles.css';
import './Portal.css';

const TeacherPortal = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('bfhs_user') || 'null'));
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      api
        .post('/auth/me', { userId: user._id, role: 'teacher' })
        .then((res) => setProfile(res.data))
        .catch(() => {});
      api
        .get('/students')
        .then((res) => setStudents(res.data))
        .catch(() => {});
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password, role: 'teacher' });
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

  if (!user || user.role !== 'teacher') {
    return (
      <section className="auth-section">
        <div className="container">
          <div className="auth-card fade-up">
            <div className="auth-head">
              <div className="auth-icon">👩‍🏫</div>
              <h2>Teacher Portal</h2>
              <p>Log in to manage your classes & students</p>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="teacher@bfhs.edu.pk" />
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
              Demo teacher login: <strong>ayesha@bfhs.edu.pk</strong> / <strong>teacher123</strong>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const p = profile || {};
  const classNames = [...new Set(students.map((s) => s.className))];

  return (
    <section className="section" style={{ minHeight: '70vh' }}>
      <div className="container">
        <div className="portal-head fade-up">
          <div className="portal-welcome">
            <div className="portal-avatar">{(p.name || user.name || 'T')[0]}</div>
            <div>
              <h2>Welcome, {p.name || user.name} 👋</h2>
              <p>{p.teacherId} · {p.subject} Teacher · {p.email}</p>
            </div>
          </div>
          <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
        </div>

        <div className="portal-stats">
          <div className="portal-stat card">
            <span className="portal-stat-icon">📖</span>
            <strong>{p.subject}</strong>
            <span>Subject</span>
          </div>
          <div className="portal-stat card">
            <span className="portal-stat-icon">🏫</span>
            <strong>{classNames.length}</strong>
            <span>Classes Assigned</span>
          </div>
          <div className="portal-stat card">
            <span className="portal-stat-icon">👨‍🎓</span>
            <strong>{students.length}</strong>
            <span>Students</span>
          </div>
          <div className="portal-stat card">
            <span className="portal-stat-icon">🎓</span>
            <strong>{p.qualification || '—'}</strong>
            <span>Qualification</span>
          </div>
        </div>

        <div className="portal-grid">
          <div className="card fade-up">
            <h3 className="mb-2">🏫 My Classes</h3>
            {(p.classesAssigned || []).map((c) => (
              <div key={c} className="class-chip">{c}</div>
            ))}
            {!p.classesAssigned?.length && <p style={{ color: 'var(--gray)' }}>No classes assigned yet.</p>}
          </div>

          <div className="card fade-up">
            <h3 className="mb-2">👨‍🎓 Students Overview</h3>
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.rollNo}</td>
                    <td>{s.name}</td>
                    <td>{s.className}-{s.section}</td>
                    <td>{s.attendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="/faculty" className="btn btn-gold">Meet the Faculty →</Link>
        </div>
      </div>
    </section>
  );
};

export default TeacherPortal;
