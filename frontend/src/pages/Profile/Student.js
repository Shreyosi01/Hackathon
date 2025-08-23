import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./Student.css";

export default function StudentProfile() {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // assuming JWT is stored here
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch profile
    axios.get("http://localhost:8000/my_profile", { headers })
      .then(res => setUser(res.data))
      .catch(err => console.error("Profile error:", err));

    // Fetch reports
    axios.get("http://localhost:8000/reports/my", { headers })
      .then(res => setReports(res.data))
      .catch(err => console.error("Reports error:", err));

    // Fetch appointments
    axios.get("http://localhost:8000/appointments/my", { headers })
      .then(res => setAppointments(res.data))
      .catch(err => console.error("Appointments error:", err));

    // Fetch rank
    axios.get("http://localhost:8000/leaderboard/me", { headers })
      .then(res => setRank(res.data.rank))
      .catch(err => console.error("Rank error:", err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="student-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="student-card">
        <div className="student-flex">
          {/* Avatar Section */}
          <div className="student-avatar-section">
            <div className="student-avatar-wrapper">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "Student")}`}
                alt={user.name}
                className="student-avatar"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="student-details">
            <div>
              <h1 className="student-name">{user.name}</h1>
              <p className="student-course">{user.course || "Course not set"}</p>
              <p className="student-email">{user.email}</p>
              <p className="student-phone">{user.phone || "Phone not set"}</p>
            </div>

            <div className="student-grid">
              {/* Student Details */}
              <div className="student-info">
                <h3 className="student-subtitle">Student Details</h3>
                <div className="student-box">
                  <p><span className="label">Student ID: </span><span className="value">{user.studentId || "Not set"}</span></p>
                  <p><span className="label">Course: </span><span className="value">{user.course || "Not set"}</span></p>
                  <p><span className="label">Semester: </span><span className="value">{user.semester || "Not set"}</span></p>
                </div>
              </div>

              {/* Health Status */}
              <div className="student-info">
                <h3 className="student-subtitle">Health Status</h3>
                <div className="student-health-box">
                  <p className="student-health-check">Last Health Check: 2 days ago</p>
                  <div className="student-health-status">
                    <div className="student-health-dot" />
                    <p>All parameters normal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reports Section */}
            <div className="student-info">
              <h3 className="student-subtitle">My Reports</h3>
              {reports.length > 0 ? (
                <ul>
                  {reports.map(r => (
                    <li key={r.id}>{r.title || "Health Report"} - {r.created_at}</li>
                  ))}
                </ul>
              ) : <p>No reports available</p>}
            </div>

            {/* Appointments Section */}
            <div className="student-info">
              <h3 className="student-subtitle">My Appointments</h3>
              {appointments.length > 0 ? (
                <ul>
                  {appointments.map(a => (
                    <li key={a.id}>{a.date_time} with Doctor #{a.doctor_id} ({a.status})</li>
                  ))}
                </ul>
              ) : <p>No appointments booked</p>}
            </div>

            {/* Leaderboard Rank */}
            <div className="student-info">
              <h3 className="student-subtitle">Leaderboard</h3>
              <p>Your Rank: {rank ?? "Not available"}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}