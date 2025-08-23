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

export default function HomePage() {
  return (
    <div className="homepage-root">
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
