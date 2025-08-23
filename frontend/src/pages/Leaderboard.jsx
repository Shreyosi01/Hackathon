import { useState, useEffect } from "react";
import Container from "../components/Container";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Leaderboard.css";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Leaderboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaderboard data from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/leaderboard")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Container><p>Loading leaderboard...</p></Container>;
  if (error) return <Container><p>Error loading leaderboard: {error}</p></Container>;

  // Sort students by score (descending)
  const sorted = [...students].sort((a, b) => b.score - a.score);

  // Chart data from backend users
  const lineData = {
    labels: sorted.map((s) => s.full_name),
    datasets: [
      {
        label: "Wellness Points",
        data: sorted.map((s) => s.score),
        fill: false,
        borderColor: "#06b6d4",
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: sorted.map((s) => s.full_name),
    datasets: [
      {
        label: "Campaign Participation",
        data: sorted.map((s) => s.campaigns || 0), // if campaigns not in backend, default 0
        backgroundColor: "#2563eb",
      },
    ],
  };

  return (
    <Container>
      <section className="leaderboard-section">
        <h2 className="leaderboard-heading">🏆 Wellness Leaderboard</h2>

        {/* Leaderboard list */}
        <div className="leaderboard-list">
          {sorted.map((s, index) => (
            <div
              key={s.id}
              className={`leaderboard-item ${
                index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""
              }`}
            >
              <span className="rank">#{index + 1}</span>
              <span className="student-name">{s.full_name}</span>
              <span className="points">{s.score} pts</span>
              <span className="campaigns">🎯 {s.campaigns || 0} campaigns</span>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="chart-card">
          <Line data={lineData} />
        </div>
        <div className="chart-card">
          <Bar data={barData} />
        </div>
      </section>
    </Container>
  );
}