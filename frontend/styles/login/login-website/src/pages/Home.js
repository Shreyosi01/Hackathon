import React, { useState } from 'react';
import Header from '../components/Header';
import LoginPracto from './LoginPracto';
import '../styles/LoginPracto.css';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignInClick = () => setShowLogin(true);
  const handleLoginSuccess = () => {
    setIsSignedIn(true);
    setShowLogin(false);
  };
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <div>
      <Header onSignInClick={handleSignInClick} isSignedIn={isSignedIn} />
      {showLogin && (
        <div className="login-modal-bg">
          <div className="login-modal">
            <button className="close-modal-btn" onClick={handleCloseLogin}>&times;</button>
            <LoginPracto onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
      {/* Main content can go here */}
    </div>
  );
}
