import { useState } from "react";
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

const demoStudents = [
  { name: "Aditi Sharma", points: 150, campaigns: 5 },
  { name: "Rahul Mehta", points: 220, campaigns: 8 },
  { name: "Sneha Verma", points: 180, campaigns: 6 },
  { name: "Arjun Patel", points: 300, campaigns: 10 },
  { name: "Ishaan Roy", points: 90, campaigns: 3 },
];

export default function Leaderboard() {
  const [students, setStudents] = useState(demoStudents);

  const refreshScores = () => {
    // Randomize points for demo effect
    const updated = students.map((s) => ({
      ...s,
      points: Math.floor(Math.random() * 300) + 50,
      campaigns: Math.floor(Math.random() * 10) + 1,
    }));
    setStudents(updated);
  };

  // Sort students by points (descending)
  const sorted = [...students].sort((a, b) => b.points - a.points);

  // Chart data from students
  const lineData = {
    labels: sorted.map((s) => s.name),
    datasets: [
      {
        label: "Wellness Points",
        data: sorted.map((s) => s.points),
        fill: false,
        borderColor: "#06b6d4",
        tension: 0.3,
      },
    ],
  };
  const barData = {
    labels: sorted.map((s) => s.name),
    datasets: [
      {
        label: "Campaign Participation",
        data: sorted.map((s) => s.campaigns),
        backgroundColor: "#2563eb",
      },
    ],
  };

  return (
    <Container>
      <section className="leaderboard-section">
        <h2 className="leaderboard-heading">🏆 Wellness Leaderboard</h2>
        <button
          className="refresh-button"
          onClick={refreshScores}
          aria-label="Refresh leaderboard"
        >
          🔄 Refresh
        </button>

        {/* Leaderboard list */}
        <div className="leaderboard-list">
          {sorted.map((s, index) => (
            <div
              key={s.name}
              className={`leaderboard-item ${
                index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""
              }`}
            >
              <span className="rank">#{index + 1}</span>
              <span className="student-name">{s.name}</span>
              <span className="points">{s.points} pts</span>
              <span className="campaigns">🎯 {s.campaigns} campaigns</span>
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
