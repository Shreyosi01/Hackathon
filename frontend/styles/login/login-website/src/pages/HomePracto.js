import React from 'react';
import './HomePracto.css';
import { useNavigate } from 'react-router-dom';

export default function HomePracto() {
  const navigate = useNavigate();
  return (
    <div className="practo-main-bg">
      <header className="practo-header">
        <div className="practo-logo">practo</div>
        <nav className="practo-nav">
          <button className="practo-nav-link" style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>Find Doctors</button>
          <button className="practo-nav-link" style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>Video Consult</button>
          <button className="practo-nav-link" style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>Surgeries</button>
        </nav>
        <div className="practo-header-actions">
          <button className="practo-login-btn" onClick={() => navigate('/')}>Login / Signup</button>
        </div>
      </header>
      <main className="practo-main-content">
        <div className="practo-search-row">
          <div className="practo-location-box">
            <span className="practo-location-icon">📍</span>
            <input className="practo-location-input" defaultValue="Visakhapatnam" />
          </div>
          <input className="practo-search-input" placeholder="Search doctors, clinics, hospitals, etc." />
        </div>
        <div className="practo-cards-row">
          <div className="practo-feature-card">
            <div className="practo-card-img practo-card-img1" />
            <div className="practo-card-title">Instant Video Consultation</div>
            <div className="practo-card-desc">Connect within 60 secs</div>
          </div>
          <div className="practo-feature-card">
            <div className="practo-card-img practo-card-img2" />
            <div className="practo-card-title">Find Doctors Near You</div>
            <div className="practo-card-desc">Confirmed appointments</div>
          </div>
          <div className="practo-feature-card">
            <div className="practo-card-img practo-card-img3" />
            <div className="practo-card-title">Surgeries</div>
            <div className="practo-card-desc">Safe and trusted surgery centers</div>
          </div>
        </div>
        <div className="practo-main-info">
          <div className="practo-main-title">Consult top doctors online for any health concern</div>
          <div className="practo-main-desc">Private online consultations with verified doctors in all specialists</div>
        </div>
        <div className="practo-main-btn-row">
          <button className="practo-main-btn">View All Specialities</button>
        </div>
      </main>
    </div>
  );
}
