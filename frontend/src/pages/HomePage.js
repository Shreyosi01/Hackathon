import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { FaRobot, FaTrophy, FaHeartbeat } from "react-icons/fa";
import { isLoggedIn, getUser, logout } from "../services/auth"; // ✅ import auth utils

export default function HomePage() {
  const loggedIn = isLoggedIn();
  const user = getUser();

  // ✅ Get role from localStorage
  const role = localStorage.getItem("role");
  const profilePath =
    role === "doctor"
      ? "/profile/doctor"
      : role === "ngo"
      ? "/profile/ngo"
      : "/profile/student";

  return (
    <div className="homepage-root">
      {/* Header */}
      <header className="homepage-header">
        <div className="logo">CareSync</div>
        <nav className="nav-links">
          <Link to="/find-doctors">Find Doctors</Link>
          <Link to="/video-consult">Video Consult</Link>
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
        </nav>
        <div className="header-actions">
          {loggedIn ? (
            <div className="profile-actions">
              {/* ✅ Dynamic profile link */}
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
      
      {/* Keep your other code below unchanged */}
    </div>
  );
}