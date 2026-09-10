import React, { useState } from 'react';
import api from '../api.js';
import '../pages/PageStyles.css';

const GRADES = [
  'KG',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
];

const SECTIONS = ['A', 'B', 'C'];

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Urdu',
  'Islamiyat',
  'Computer Science',
  'Social Studies',
  'Other',
];

const ROLE_LABEL = { student: 'Student', teacher: 'Teacher', admin: 'Admin' };

const emptyForm = {
  name: '',
  fatherName: '',
  gender: 'Male',
  className: 'Grade 6',
  section: 'A',
  subject: 'Mathematics',
  qualification: '',
  email: '',
  password: '',
};

/**
 * Shared login + registration card for the Student / Teacher / Admin portals.
 * On success it stores the token + user in localStorage and calls onSuccess(data).
 */
const PortalAuth = ({ role, icon, title, subtitle, onSuccess }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';
  const roleLabel = ROLE_LABEL[role] || 'User';

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const switchMode = (next) => {
    setMode(next);
    setError('');
  };

  const buildPayload = () => {
    if (!isRegister) {
      return { email: form.email, password: form.password, role };
    }
    const base = { role, name: form.name, email: form.email, password: form.password };
    if (role === 'student') {
      return {
        ...base,
        fatherName: form.fatherName,
        gender: form.gender,
        className: form.className,
        section: form.section,
      };
    }
    if (role === 'teacher') {
      return { ...base, subject: form.subject, qualification: form.qualification };
    }
    return base;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post(isRegister ? '/auth/register' : '/auth/login', buildPayload());
      localStorage.setItem('bfhs_token', data.token);
      localStorage.setItem('bfhs_user', JSON.stringify(data));
      onSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || (isRegister ? 'Registration failed' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-card fade-up">
          <div className="auth-head">
            <div className="auth-icon">{icon}</div>
            <h2>{isRegister ? `Create ${roleLabel} Account` : title}</h2>
            <p>{isRegister ? 'Register with your details, then log in to continue.' : subtitle}</p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${!isRegister ? 'active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-tab ${isRegister ? 'active' : ''}`}
              onClick={() => switchMode('register')}
            >
              Register
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={form.name} onChange={update('name')} required placeholder="e.g. Ali Hassan" />
              </div>
            )}

            {isRegister && role === 'student' && (
              <>
                <div className="form-group">
                  <label>Father's Name</label>
                  <input
                    type="text"
                    value={form.fatherName}
                    onChange={update('fatherName')}
                    required
                    placeholder="e.g. Muhammad Hassan"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Class</label>
                    <select value={form.className} onChange={update('className')} required>
                      {GRADES.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Section</label>
                    <select value={form.section} onChange={update('section')} required>
                      {SECTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select value={form.gender} onChange={update('gender')} required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </>
            )}

            {isRegister && role === 'teacher' && (
              <>
                <div className="form-group">
                  <label>Subject</label>
                  <select value={form.subject} onChange={update('subject')} required>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Qualification</label>
                  <input
                    type="text"
                    value={form.qualification}
                    onChange={update('qualification')}
                    placeholder="e.g. M.Sc Mathematics"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                required
                placeholder={`${role}@bfhs.edu.pk`}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={update('password')}
                required
                minLength={6}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="btn btn-green"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {loading
                ? isRegister
                  ? 'Creating account…'
                  : 'Please wait…'
                : isRegister
                ? 'Create Account →'
                : 'Login to Portal →'}
            </button>
          </form>

          <p className="auth-switch">
            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
            <button type="button" className="link-btn" onClick={() => switchMode(isRegister ? 'login' : 'register')}>
              {isRegister ? 'Login here' : 'Register here'}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PortalAuth;
