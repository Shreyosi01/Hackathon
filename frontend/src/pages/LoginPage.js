import React from 'react';
import Header from '../components/Header';
import '../components/Header.css';
import axios from "axios";

const roles = ['Student', 'Doctor', 'NGO', 'Admin'];
const languages = [
  { code: 'EN', label: 'English' },
  { code: 'HI', label: 'हिन्दी' }
];

const text = {
  EN: {
    title: 'HH308 Health Platform',
    subtitle: 'Connect. Care. Heal.',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    selectRole: 'Select Role',
    signIn: 'Sign In',
    footer: 'Connecting Communities for Better Health',
  },
  HI: {
    title: 'HH308 स्वास्थ्य प्लेटफ़ॉर्म',
    subtitle: 'जुड़ें। देखभाल करें। स्वस्थ रहें।',
    email: 'ईमेल',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    selectRole: 'भूमिका चुनें',
    signIn: 'साइन इन करें',
    footer: 'बेहतर स्वास्थ्य के लिए समुदायों को जोड़ना',
  },
};

export default function LoginPage() {
  const [email, setemail] = React.useState('');
  const [role, setRole] = React.useState(roles[0]);
  const [lang, setLang] = React.useState('EN');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        role
      });

      alert(`✅ Login successful! Welcome ${res.data.user}`);
      console.log("Login response:", res.data);

      // you can also save token in localStorage if backend returns it
      // localStorage.setItem("token", res.data.token);

    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-center-wrapper">
        <div className="login-demo-top">
          <div className="login-demo-heart">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="36" cy="36" r="36" fill="#EAF3FA"/>
              <path d="M36 51C35.7 51 35.4 50.9 35.2 50.7L24.2 39.7C21.1 36.6 21.1 31.4 24.2 28.3C25.7 26.8 27.7 26 29.8 26C31.9 26 33.9 26.8 35.4 28.3L36 28.9L36.6 28.3C39.7 25.2 44.9 25.2 48 28.3C51.1 31.4 51.1 36.6 48 39.7L36.8 50.7C36.6 50.9 36.3 51 36 51Z" stroke="#4A90E2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#fff"/>
            </svg>
          </div>
          <div className="login-demo-title">{text[lang].title}</div>
          <div className="login-demo-subtitle">{text[lang].subtitle}</div>
        </div>
        <div className="login-card login-centered-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-row login-lang-row" style={{justifyContent: 'flex-end'}}>
              <div className="login-lang" title="Change Language">
                <span role="img" aria-label="globe">🌐</span>
                <select
                  className="lang-select"
                  value={lang}
                  onChange={e => setLang(e.target.value)}
                  aria-label="Select Language"
                  style={{marginLeft: 4}}
                >
                  {languages.map(l => (
                    <option key={l.code} value={l.code}>{l.code}</option>
                  ))}
                </select>
              </div>
            </div>
            <label className="login-label left" htmlFor="email">{text[lang].email}</label>
            <input
              className="login-input"
              id="email"
              type="text"
              placeholder={text[lang].emailPlaceholder}
              value={email}
              onChange={e => setemail(e.target.value)}
              required
            />
            <label className="login-label left" htmlFor="role">{text[lang].selectRole}</label>
            <select
              className="login-select"
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <button
              className="login-btn login-demo-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : text[lang].signIn}
            </button>
          </form>
          <div className="login-footer login-demo-footer">
            {text[lang].footer}
          </div>
        </div>
      </div>
    </div>
  );
}