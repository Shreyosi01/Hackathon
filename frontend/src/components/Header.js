import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { isLoggedIn, getUser, logout } from "../services/auth";

export default function Header() {
  const loggedIn = isLoggedIn();
  const user = getUser();
  const profilePath =
    user?.role === "doctor"
      ? "/profile/doctor"
      : user?.role === "ngo"
      ? "/profile/ngo"
      : "/profile/student";

  return (
    <header className="main-header">
      {/* Logo - clickable to go home */}
      <Link to="/" className="logo-btn">
        Care<span className="logo-highlight">Sync</span>
      </Link>

      {/* Navigation (Home removed) */}
      <nav className="nav-links">
        <Link to="/find-doctors">👨‍⚕️ Find Doctors</Link>
        <Link to="/video-consult">🎥 Video Consult</Link>
        <Link to="/ai-chatbot">🤖 AI Chatbot</Link>
        <Link to="/wellness-leaderboard">🏆 Leaderboard</Link>
        <Link to="/health-report">❤️ Health Report</Link>
        <Link to="/campaigns">📢 Campaigns</Link>
      </nav>

      {/* Right side actions */}
      <div className="header-actions">
        {loggedIn ? (
          <div className="profile-actions">
            <Link to={profilePath} className="user-name">
              👤 {user?.full_name || "Profile"}
            </Link>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <button
            className="login-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Login / Signup
          </button>
        )}
      </div>
    </header>
  );
}
