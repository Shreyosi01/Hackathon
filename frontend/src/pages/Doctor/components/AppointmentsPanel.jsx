import React, { useEffect, useState } from "react";
import { getDoctorAppointments, updateAppointmentStatus } from "../../../services/doctorApi";

export default function AppointmentsPanel() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorAppointments().then(setItems).finally(() => setLoading(false));
  }, []);

  const filtered = items.filter(a =>
    (a.patient_name || "").toLowerCase().includes(q.toLowerCase()) ||
    (a.reason || "").toLowerCase().includes(q.toLowerCase()) ||
    (a.mode || "").toLowerCase().includes(q.toLowerCase())
  );

  const clickStatus = async (appt) => {
    if (appt.status === "pending") {
      const ok = window.confirm(`Mark appointment #${appt.id} as completed?`);
      if (!ok) return;
      // optimistic UI
      setItems(prev => prev.map(x => x.id === appt.id ? { ...x, status: "done" } : x));
      try {
        await updateAppointmentStatus(appt.id, "done");
      } catch {
        // rollback
        setItems(prev => prev.map(x => x.id === appt.id ? { ...x, status: "pending" } : x));
        alert("Failed to update status.");
      }
    }
  };

  return (
    <div className="card">
      <div className="panel-header">
        <h2>My Appointments</h2>
        <input
          className="input search"
          placeholder="Search by patient, reason, or mode…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table" aria-label="My appointments">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Date/Time</th>
              <th>Reason</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.patient_name}</td>
                <td>{a.date} • {a.time}</td>
                <td>{a.reason}</td>
                <td>{a.mode}</td>
                <td>
                  <span
                    className={`status-pill ${a.status === "pending" ? "pending" : "done"}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => clickStatus(a)}
                    onKeyDown={(e) => e.key === "Enter" && clickStatus(a)}
                    title={a.status === "pending" ? "Click to mark completed" : "Completed"}
                  >
                    {a.status === "pending" ? "Pending" : "Completed"}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="6">No matching appointments.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
