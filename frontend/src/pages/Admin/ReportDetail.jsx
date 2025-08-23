import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReportById } from "./adminApi";

export default function ReportDetails() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportById(id).then(setReport).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="card"><p>Loading…</p></div>;
  if (!report) return <div className="card"><p>Not found.</p></div>;

  return (
    <div className="grid grid-2">
      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Report #{report.id}</h2>
        <p><strong>Title:</strong> {report.title}</p>
        <p><strong>User:</strong> {report.user_name}</p>
        <p><strong>Status:</strong> {report.status}</p>
        <p><strong>Created:</strong> {report.created_at}</p>
        <p><strong>Summary:</strong></p>
        <p>{report.summary || "No summary provided."}</p>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Metadata</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>
{JSON.stringify(report.meta || {}, null, 2)}
        </pre>
        <div style={{ marginTop: 12 }}>
          <Link className="btn" to="/admin/reports">Back to Reports</Link>
        </div>
      </div>
    </div>
  );
}
