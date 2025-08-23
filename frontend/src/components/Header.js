import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaTrophy,
  FaHeartbeat,
  FaUserMd,
  FaVideo,
  FaBullhorn,
} from "react-icons/fa";
import { isLoggedIn, getUser, logout } from "../services/auth"; 

export default function Header() {
  const loggedIn = isLoggedIn();
  const user = getUser();

  // ✅ Profile path based on role
  const profilePath =
    user?.role === "doctor"
      ? "/profile/doctor"
      : user?.role === "ngo"
      ? "/profile/ngo"
      : "/profile/student";

  return (
    <header className="homepage-header">
      {/* Logo */}
      <div className="logo">CareSync</div>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/">
          <span role="img" aria-label="Home" style={{ marginRight: 4 }}>
            🏠
          </span>
          Home
        </Link>
        <Link to="/find-doctors">
          <FaUserMd style={{ marginRight: 4 }} />
          Find Doctors
        </Link>
        <Link to="/video-consult">
          <FaVideo style={{ marginRight: 4 }} />
          Video Consult
        </Link>
        <Link to="/ai-chatbot">
          <FaRobot style={{ marginRight: 4 }} />
          AI Chatbot
        </Link>
        <Link to="/wellness-leaderboard">
          <FaTrophy style={{ marginRight: 4 }} />
          Wellness Leaderboard
        </Link>
        <Link to="/health-report">
          <FaHeartbeat style={{ marginRight: 4 }} />
          Health Reporting
        </Link>
        <Link to="/campaigns">
          <FaBullhorn style={{ marginRight: 4 }} />
          Campaigns
        </Link>
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
