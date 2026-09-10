import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalAuth from '../components/PortalAuth.jsx';
import './PageStyles.css';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleSuccess = (data) => {
    if (data.role === 'admin') {
      navigate('/admin-dashboard');
    }
  };

  return (
    <PortalAuth
      role="admin"
      icon="🛡️"
      title="Admin Login"
      subtitle="Authorized personnel only. Sign in to manage the school system."
      onSuccess={handleSuccess}
    />
  );
};

export default AdminLogin;
