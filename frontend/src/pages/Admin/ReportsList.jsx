import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllReports } from "./adminApi";

export default function ReportsList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReports().then(setItems).finally(() => setLoading(false));
  }, []);

  const filtered = items.filter(r =>
    (r.title || "").toLowerCase().includes(q.toLowerCase()) ||
    (r.user_name || "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="card">
        <h2 style={{ marginBottom: 12 }}>All Reports</h2>
        <input
          className="input"
          placeholder="Search by title or user…"
          value={q}
          onChange={e => setQ(e.target.value)}
          aria-label="Search reports"
        />
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <table className="table" aria-label="Reports table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>User</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.title}</td>
                  <td>{r.user_name}</td>
                  <td>{r.status}</td>
                  <td>{r.created_at}</td>
                  <td>
                    <Link className="btn" to={`/admin/reports/${r.id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6">No reports found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
