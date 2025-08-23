import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { getReportTrends } from "./adminApi";

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function ReportsTrends() {
  const [data, setData] = useState({ months: [], counts: [], severities: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportTrends().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card"><p>Loading…</p></div>;

  const barData = {
    labels: data.months,
    datasets: [{ label: "Reports per Month", data: data.counts, backgroundColor: "#26a69a" }]
  };
  const lineData = {
    labels: data.months,
    datasets: [{ label: "Avg Severity", data: data.severities, borderColor: "#00796b" }]
  };

  return (
    <div className="grid grid-2">
      <div className="card"><Bar data={barData} /></div>
      <div className="card"><Line data={lineData} /></div>
    </div>
  );
}
