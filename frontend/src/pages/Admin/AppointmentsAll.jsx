import React, { useEffect, useState } from "react";
import { getAllAppointments } from "./adminApi";

export default function AppointmentsAll() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAppointments().then(setItems).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2 style={{ marginBottom: 12 }}>All Appointments</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table" aria-label="Appointments table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.patient_name}</td>
                <td>{a.doctor_name}</td>
                <td>{a.date}</td>
                <td>{a.status}</td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan="5">No appointments.</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
