import React from 'react';
import { motion } from 'framer-motion';
import './Doctor.css'; // 👈 link the css file

export default function Doctor({ user }) {
  return (
    <div className="doctor-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="doctor-card"
      >
        <div className="doctor-flex">
          {/* Avatar Section */}
          <div className="doctor-avatar-section">
            <div className="doctor-avatar-wrapper">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                }
                alt={user.name}
                className="doctor-avatar"
              />
              <button className="doctor-avatar-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="doctor-avatar-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="doctor-details">
            <div>
              <h1 className="doctor-name">Dr. {user.name}</h1>
              <p className="doctor-specialty">{user.specialty || 'Medical Professional'}</p>
              <p className="doctor-email">{user.email}</p>
            </div>

            <div className="doctor-grid">
              {/* Professional Details */}
              <div>
                <h3 className="section-title">Professional Details</h3>
                <div className="doctor-box">
                  <p>
                    <span className="label">Registration No: </span>
                    <span className="value">
                      {user.registrationNumber || 'Not set'}
                    </span>
                  </p>
                  <p>
                    <span className="label">Experience: </span>
                    <span className="value">
                      {user.experience ? `${user.experience} years` : 'Not set'}
                    </span>
                  </p>
                  <div>
                    <p className="label">Qualifications:</p>
                    <div className="doctor-qualifications">
                      {(user.qualifications || ['MBBS']).map((qual, i) => (
                        <span key={i} className="qualification">
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Stats */}
              <div>
                <h3 className="section-title">Consultation Stats</h3>
                <div className="doctor-stats-box">
                  <div className="doctor-stats-grid">
                    <div>
                      <p className="label">Total Consultations</p>
                      <p className="stat-value">1,234</p>
                    </div>
                    <div>
                      <p className="label">Rating</p>
                      <div className="doctor-rating">
                        <p className="stat-value">4.8</p>
                        <svg
                          className="star-icon"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                  <div>
                    <p className="label">Availability</p>
                    <div className="doctor-days">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                        <div key={day} className="day">
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}