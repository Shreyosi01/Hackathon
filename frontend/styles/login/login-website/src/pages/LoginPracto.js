
import React, { useState } from 'react';
import '../styles/LoginPracto.css';
import HeaderPracto from '../components/HeaderPracto';
import { useNavigate } from 'react-router-dom';

export default function LoginPracto({ onLoginSuccess }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [otpInstead, setOtpInstead] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <>
      <HeaderPracto onHomeClick={() => navigate('/home')} />
      <div className="practo-login-container">
        <div className="practo-login-content">
          <div className="practo-login-illustration">
            {/* You can replace this with an actual SVG or image */}
            <img src="https://static.practo.com/images/login/illustration.png" alt="Login Illustration" className="practo-illustration-img" />
          </div>
          <div className="practo-login-card">
            <div className="practo-login-tabs">
              <span className="active">Login</span>
              <span>Register</span>
            </div>
            <form className="practo-login-form" onSubmit={handleSubmit}>
              <label className="practo-login-label" htmlFor="user">Mobile Number / Email ID</label>
              <input
                className="practo-login-input"
                id="user"
                type="text"
                placeholder="Mobile Number / Email ID"
                value={user}
                onChange={e => setUser(e.target.value)}
                required
              />
              <label className="practo-login-label" htmlFor="password">Password</label>
              <input
                className="practo-login-input"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required={!otpInstead}
                disabled={otpInstead}
              />
              <div className="practo-login-row">
                <label className="practo-checkbox">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                  <span>Remember me for 30 days</span>
                </label>
                <button type="button" className="practo-forgot" style={{background: 'none', border: 'none', color: '#1e88a8', textDecoration: 'underline', cursor: 'pointer', padding: 0}}>Forgot password?</button>
              </div>
              <div className="practo-login-row">
                <label className="practo-checkbox">
                  <input type="checkbox" checked={otpInstead} onChange={e => setOtpInstead(e.target.checked)} />
                  <span>Login with OTP instead of password</span>
                </label>
              </div>
              <button className="practo-login-btn" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
