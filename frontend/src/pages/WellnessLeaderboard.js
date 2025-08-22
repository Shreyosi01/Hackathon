import React from 'react';
import './WellnessLeaderboard.css';
import { FaTrophy } from 'react-icons/fa';

export default function WellnessLeaderboard() {
  return (
    <div className="wellness-leaderboard-root">
      <div className="wellness-leaderboard-header">
        <FaTrophy size={32} style={{marginRight: 8}} /> Wellness Leaderboard
      </div>
      <div className="wellness-leaderboard-body">
        <p>Leaderboard coming soon!</p>
      </div>
    </div>
  );
}
