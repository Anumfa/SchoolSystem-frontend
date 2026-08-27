import React, { useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import api from '../api.js';
import './PageStyles.css';

const steps = [
  { num: '1', title: 'Submit Application', desc: 'Fill out the online admission form with your child’s details.' },
  { num: '2', title: 'Documents', desc: 'Submit required documents — birth certificate, photos & school records.' },
  { num: '3', title: 'Assessment', desc: 'Child takes a simple assessment & informal interview.' },
  { num: '4', title: 'Enrolment', desc: 'Receive confirmation and complete fee payment to secure the seat.' },
];

const feeStructure = [
  { grade: 'KG - Grade 5 (Primary)', monthly: 'PKR 8,500', annual: 'PKR 102,000' },
  { grade: 'Grade 6 - 8 (Middle)', monthly: 'PKR 10,000', annual: 'PKR 120,000' },
  { grade: 'Grade 9 - 10 (Matric)', monthly: 'PKR 12,500', annual: 'PKR 150,000' },
];

const initialForm = {
  studentName: '',
  fatherName: '',
  motherName: '',
  dateOfBirth: '',
  gender: 'Male',
  classApplyingFor: 'Grade 1',
  email: '',
  phone: '',
  address: '',
  previousSchool: '',
  lastMarks: '',
};

const Admissions = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post('/admissions', form);
      setStatus({ type: 'success', msg: '🎉 Application submitted successfully! Our admissions team will contact you soon.' });
      setForm(initialForm);
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageBanner
        title="Admissions"
        subtitle="Admissions are now open for the 2026-27 academic session. Join the Bright Future family today!"
      />

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-tag">Admission Process</span>
            <h2 className="section-title">Simple 4-Step Process</h2>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={s.num} className="step-card card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form + fee table */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-tag">Apply Now</span>
            <h2 className="section-title">Online Admission Application</h2>
          </div>
          <div className="contact-grid">
            <form className="card fade-up" onSubmit={handleSubmit}>
              {status && (
                <div className={`alert alert-${status.type}`}>{status.msg}</div>
              )}
              <div className="form-group">
                <label>Student Full Name *</label>
                <input name="studentName" value={form.studentName} onChange={handleChange} required placeholder="e.g. Ali Hassan" />
              </div>
              <div className="form-group">
                <label>Father's Name *</label>
                <input name="fatherName" value={form.fatherName} onChange={handleChange} required placeholder="e.g. Muhammad Hassan" />
              </div>
              <div className="form-group">
                <label>Mother's Name</label>
                <input name="motherName" value={form.motherName} onChange={handleChange} placeholder="e.g. Saima Hassan" />
              </div>
              <div className="form-group">
                <label>Date of Birth *</label>
                <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Class Applying For *</label>
                <select name="classApplyingFor" value={form.classApplyingFor} onChange={handleChange}>
                  {['KG', ...Array.from({ length: 10 }, (_, i) => `Grade ${i + 1}`)].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Parent Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label>Contact Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+92 3XX XXXXXXX" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Home address" />
              </div>
              <div className="form-group">
                <label>Previous School (if any)</label>
                <input name="previousSchool" value={form.previousSchool} onChange={handleChange} placeholder="School name" />
              </div>
              <div className="form-group">
                <label>Last Examination Marks</label>
                <input name="lastMarks" value={form.lastMarks} onChange={handleChange} placeholder="e.g. 85%" />
              </div>
              <button type="submit" className="btn btn-green" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Submitting…' : 'Submit Application →'}
              </button>
            </form>

            <div>
              <div className="card mb-3 fade-up">
                <h3 className="mb-2">📋 Fee Structure 2026-27</h3>
                <table className="fee-table">
                  <thead>
                    <tr>
                      <th>Grade Level</th>
                      <th>Monthly</th>
                      <th>Annual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructure.map((f) => (
                      <tr key={f.grade}>
                        <td>{f.grade}</td>
                        <td>{f.monthly}</td>
                        <td>{f.annual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card fade-up">
                <h3 className="mb-2">📄 Required Documents</h3>
                <ul style={{ color: 'var(--gray)', fontSize: '0.9rem', paddingLeft: '18px', lineHeight: 2 }}>
                  <li>Birth certificate (B-Form)</li>
                  <li>3 recent passport-size photographs</li>
                  <li>Previous school report card / leaving certificate</li>
                  <li>Copy of parent CNIC</li>
                  <li>Health / vaccination record</li>
                </ul>
                <p className="mt-2" style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>
                  💡 For enquiries call <strong>+92 300 1234567</strong> or visit the school office, Mon-Sat 8:00 AM – 2:30 PM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admissions;
