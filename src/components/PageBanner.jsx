import React from 'react';
import { Link } from 'react-router-dom';

const PageBanner = ({ title, subtitle }) => {
  return (
    <section className="page-banner">
      <div className="container">
        <h1 className="fade-up">{title}</h1>
        {subtitle && <p className="fade-up">{subtitle}</p>}
        <div className="breadcrumb fade-up">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>{title}</span>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
