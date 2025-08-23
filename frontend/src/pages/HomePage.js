import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaTrophy,
  FaHeartbeat,
  FaUserMd,
  FaVideo,
  FaBullhorn,
} from "react-icons/fa";
import { isLoggedIn, getUser, logout } from "../services/auth"; // ✅ import auth utils

export default function HomePage() {
  const loggedIn = isLoggedIn();
  const user = getUser();

  // ✅ get profile path based on role
  const profilePath =
    user?.role === "doctor"
      ? "/profile/doctor"
      : user?.role === "ngo"
      ? "/profile/ngo"
      : "/profile/student"; // default to student

  return (
    <div className="homepage-root">
      {/* Header */}
      <header className="homepage-header">
        <div className="logo">CareSync</div>
        <nav className="nav-links">
          <Link to="/">
            <span role="img" aria-label="Home" style={{ marginRight: 4 }}>🏠</span>
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
        <div className="header-actions">
          {loggedIn ? (
            <div className="profile-actions">
              {/* ✅ Profile is now a clickable link */}
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

      {/* Feature Cards / Widgets */}
      <div className="feature-cards-row">
        <Link to="/find-doctors" className="feature-card">
          <div className="feature-img">
            <FaUserMd size={32} color="#fff" />
          </div>
          <div className="feature-title">Find Doctors</div>
          <div className="feature-desc">
            Search and book appointments with top doctors
          </div>
        </Link>
        <Link to="/video-consult" className="feature-card">
          <div className="feature-img">
            <FaVideo size={32} color="#fff" />
          </div>
          <div className="feature-title">Video Consult</div>
          <div className="feature-desc">
            Instant video consultation with specialists
          </div>
        </Link>
        <Link to="/ai-chatbot" className="feature-card">
          <div className="feature-img">
            <FaRobot size={32} color="#fff" />
          </div>
          <div className="feature-title">AI Chatbot</div>
          <div className="feature-desc">
            Get instant answers to your health queries
          </div>
        </Link>
        <Link to="/wellness-leaderboard" className="feature-card">
          <div className="feature-img">
            <FaTrophy size={32} color="#fff" />
          </div>
          <div className="feature-title">Wellness Leaderboard</div>
          <div className="feature-desc">Track your wellness progress</div>
        </Link>
        <Link to="/health-report" className="feature-card">
          <div className="feature-img">
            <FaHeartbeat size={32} color="#fff" />
          </div>
          <div className="feature-title">Health Reporting</div>
          <div className="feature-desc">Report your health issues easily</div>
        </Link>
        <Link to="/campaigns" className="feature-card">
          <div className="feature-img">
            <FaBullhorn size={32} color="#fff" />
          </div>
          <div className="feature-title">Campaigns</div>
          <div className="feature-desc">Join and track health campaigns</div>
        </Link>
      </div>

      {/* Tagline and Button */}
      <div className="homepage-bottom">
        <div className="homepage-tagline">
          <strong>Consult top doctors online for any health concern</strong>
          <div className="homepage-subtag">
            Private online consultations with verified doctors in all
            specialists
          </div>
        </div>
      </div>
    </div>
  );
}
