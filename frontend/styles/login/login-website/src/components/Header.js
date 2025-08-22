import React from 'react';
import './Header.css';

export default function Header({ onSignInClick, isSignedIn }) {
  return (
    <header className="main-header">
      <div className="header-title">CareSync</div>
      <div className="header-actions">
        {!isSignedIn && (
          <button className="sign-in-btn" onClick={onSignInClick}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
