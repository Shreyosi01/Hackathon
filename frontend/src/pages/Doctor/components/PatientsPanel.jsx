import React, { useEffect, useState } from "react";
import { getPastPatients } from "../../../services/doctorApi";
import { Link } from "react-router-dom";

export default function PatientsPanel() {
  const [patients, setPatients] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPastPatients().then(setPatients).finally(() => setLoading(false));
  }, []);

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="card">
      <h2 style={{ marginBottom: 12 }}>Past Patients</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table" aria-label="Past patients">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Disease / Condition</th>
              <th>Last Visit</th>
              <th>Reports</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <React.Fragment key={p.id}>
                <tr>
                  <td>
                    <button className="link-btn" onClick={() => toggle(p.id)}>
                      {expanded[p.id] ? "▾" : "▸"} {p.name}
                    </button>
                  </td>
                  <td>{p.disease}</td>
                  <td>{p.last_visit}</td>
                  <td>{p.reports?.length || 0}</td>
                </tr>
                {expanded[p.id] && (
                  <tr className="subrow">
                    <td colSpan="4">
                      <div className="subcard">
                        <strong>Reports</strong>
                        <table className="table subtable">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Title</th>
                              <th>Created</th>
                              <th>Open</th>
                            </tr>
                          </thead>
                          <tbody>
                            {p.reports.map((r) => (
                              <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.title}</td>
                                <td>{r.created_at}</td>
                                <td>
                                  <Link className="btn" to={`/reports/${r.id}`}>
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="hint">Locations available on the “Reports Map” tab.</div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {patients.length === 0 && <tr><td colSpan="4">No patients found.</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
