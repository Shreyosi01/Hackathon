import React, { useEffect, useState } from 'react';
import './WellnessLeaderboard.css';
import { FaTrophy } from 'react-icons/fa';

export default function WellnessLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    }
    fetchLeaderboard();
  }, []);
  return (
    <div className="wellness-leaderboard-root">
      <div className="wellness-leaderboard-header">
        <FaTrophy size={32} style={{marginRight: 8}} /> Wellness Leaderboard
      </div>
      <div className="wellness-leaderboard-body">
        {leaderboard.length === 0 ? (
          <p>No leaderboard data available.</p>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Reports</th>
                <th>Appointments</th>
                <th>Campaigns</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry.student_id}>
                  <td>{idx + 1}</td>
                  <td>{entry.full_name}</td>
                  <td>{entry.reports}</td>
                  <td>{entry.appointments}</td>
                  <td>{entry.campaigns}</td>
                  <td>{entry.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
