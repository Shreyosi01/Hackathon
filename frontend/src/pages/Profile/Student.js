import React from 'react';
import { motion } from 'framer-motion';
import './Student.css';

export default function StudentProfile({ user }) {
  return (
    <div className="student-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="student-card"
      >
        <div className="student-flex">
          {/* Avatar Section */}
          <div className="student-avatar-section">
            <div className="student-avatar-wrapper">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}`
                }
                alt={user.name}
                className="student-avatar"
              />
              <button className="student-avatar-edit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="student-details">
            <div>
              <h1 className="student-name">{user.name}</h1>
              <p className="student-course">{user.course || 'Student'}</p>
              <p className="student-email">{user.email}</p>
            </div>

            <div className="student-grid">
              {/* Student Details */}
              <div className="student-info">
                <h3 className="student-subtitle">Student Details</h3>
                <div className="student-box">
                  <p>
                    <span className="label">Student ID: </span>
                    <span className="value">{user.studentId || 'Not set'}</span>
                  </p>
                  <p>
                    <span className="label">Course: </span>
                    <span className="value">{user.course || 'Not set'}</span>
                  </p>
                  <p>
                    <span className="label">Semester: </span>
                    <span className="value">{user.semester || 'Not set'}</span>
                  </p>
                </div>
              </div>

              {/* Health Status */}
              <div className="student-info">
                <h3 className="student-subtitle">Health Status</h3>
                <div className="student-health-box">
                  <p className="student-health-check">
                    Last Health Check: 2 days ago
                  </p>
                  <div className="student-health-status">
                    <div className="student-health-dot" />
                    <p>All parameters normal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="student-activity">
              <h3 className="student-subtitle">Recent Activity</h3>
              <div className="student-activity-list">
                {[
                  'Completed health assessment',
                  'Attended mental health webinar',
                  'Updated vaccination records',
                ].map((activity, i) => (
                  <div key={i} className="student-activity-item">
                    <div className="student-activity-dot" />
                    <p>{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}