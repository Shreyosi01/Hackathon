
import React, { useState } from 'react';
import './LoginPage.css';
import CareSyncLogo from '../assets/caresync-logo.png'; // Place logo in src/assets/
const roles = ['Student', 'Doctor', 'NGO', 'Admin'];
const languages = [
  { code: 'EN', label: 'English' },
  { code: 'HI', label: 'हिन्दी' }
];

const text = {
  EN: {
    title: 'CareSync Health Platform',
    subtitle: 'Connect. Care. Heal.',
    email: 'Email/Phone',
    emailPlaceholder: 'Enter your email/phone',
    selectRole: 'Select Role',
    signIn: 'Sign In',
    footer: 'Connecting Communities for Better Health',
    roles: {
      Student: 'Student',
      Doctor: 'Doctor',
      NGO: 'NGO',
      Admin: 'Admin',
    },
  },
  HI: {
    title: 'केयरसिंक स्वास्थ्य प्लेटफ़ॉर्म',
    subtitle: 'जुड़ें। देखभाल करें। स्वस्थ रहें।',
    email: 'उपयोगकर्ता नाम',
    emailPlaceholder: 'अपना उपयोगकर्ता नाम दर्ज करें',
    selectRole: 'भूमिका चुनें',
    signIn: 'साइन इन करें',
    footer: 'बेहतर स्वास्थ्य के लिए समुदायों को जोड़ना',
    roles: {
      Student: 'विद्यार्थी',
      Doctor: 'डॉक्टर',
      NGO: 'एनजीओ',
      Admin: 'प्रशासक',
    },
  },
};

export default function LoginPage() {
  const [email, setemail] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [lang, setLang] = useState('EN');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <img src={CareSyncLogo} alt="CareSync Logo" className="caresync-logo" />
        <h2 className="login-title">{text[lang].title}</h2>
        <p className="login-subtitle">{text[lang].subtitle}</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <span role="img" aria-label="globe">🌐</span>
            <select
              className="lang-select"
              value={lang}
              onChange={e => setLang(e.target.value)}
              aria-label="Select Language"
              style={{ marginLeft: 4 }}
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
          <label htmlFor="email">{text[lang].email}</label>
          <input
            id="email"
            type="text"
            placeholder={text[lang].emailPlaceholder}
            value={email}
            onChange={e => setemail(e.target.value)}
            required
          />
          <label htmlFor="role">{text[lang].selectRole}</label>
          <select id="role" value={role} onChange={e => setRole(e.target.value)}>
            {roles.map(r => <option key={r} value={r}>{text[lang].roles[r]}</option>)}
          </select>
          <button type="submit" className="sign-in-btn">{text[lang].signIn}</button>
        </form>
        <div className="login-footer">{text[lang].footer}</div>
      </div>
      <div className="login-caresync">CareSync</div>
    </div>
  );
}
