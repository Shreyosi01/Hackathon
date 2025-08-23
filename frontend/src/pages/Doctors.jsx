import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./Doctor.css";

export default function Doctor({ user }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get("http://localhost:8000/appointments/doctor", { headers })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching doctor appointments:", err));
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.put(`http://localhost:8000/appointments/${id}/status`, { status }, { headers });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

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
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "Doctor"
                  )}`
                }
                alt={user.name}
                className="doctor-avatar"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="doctor-details">
            <h1 className="doctor-name">Dr. {user.name}</h1>
            <p className="doctor-specialty">{user.specialty || "Medical Professional"}</p>
            <p className="doctor-email">{user.email}</p>

            {/* Appointments Section */}
            <div className="doctor-info">
              <h3 className="section-title">My Appointments</h3>
              {appointments.length > 0 ? (
                <ul>
                  {appointments.map((a) => (
                    <li key={a.id}>
                      <strong>{a.date_time}</strong> with {a.student_name} ({a.status})
                      <div>
                        <button onClick={() => updateStatus(a.id, "accepted")}>Accept</button>
                        <button onClick={() => updateStatus(a.id, "rejected")}>Reject</button>
                        <button onClick={() => updateStatus(a.id, "completed")}>Complete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No appointments assigned</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}