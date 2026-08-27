import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import './PageStyles.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password, role: 'admin' });
      localStorage.setItem('bfhs_token', data.token);
      localStorage.setItem('bfhs_user', JSON.stringify(data));
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-card fade-up">
          <div className="auth-head">
            <div className="auth-icon">🛡️</div>
            <h2>Admin Login</h2>
            <p>Authorized personnel only. Sign in to manage the school system.</p>
          </div>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@bfhs.edu.pk" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-green" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Verifying…' : 'Login to Dashboard →'}
            </button>
          </form>
          <div className="auth-hint">
            Demo admin login: <strong>admin@bfhs.edu.pk</strong> / <strong>admin123</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
