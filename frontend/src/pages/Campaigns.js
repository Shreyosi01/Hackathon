import React, { useState } from "react";
import "./Campaigns.css";

export default function Campaigns() {
  const [tab, setTab] = useState("ongoing");

  const ongoingCampaigns = [
    {
      id: 1,
      title: "Mental Health Awareness Week",
      description: "Join workshops and group activities to promote mental well-being.",
      date: "March 1 - March 7",
    },
    {
      id: 2,
      title: "Daily Fitness Challenge",
      description: "Track your daily exercise and win exciting rewards.",
      date: "Ongoing until March 15",
    },
  ];

  const upcomingCampaigns = [
    {
      id: 3,
      title: "Healthy Eating Drive",
      description: "Discover balanced diets and healthy recipes with experts.",
      date: "Starts March 20",
    },
    {
      id: 4,
      title: "Digital Detox Week",
      description: "Reduce screen time and engage in real-world mindful activities.",
      date: "Starts April 1",
    },
  ];

  return (
    <div className="campaigns-container">
      <h2 className="campaigns-title">Campaigns</h2>
      <div className="tabs">
        <button
          className={`tab-btn ${tab === "ongoing" ? "active" : ""}`}
          onClick={() => setTab("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`tab-btn ${tab === "upcoming" ? "active" : ""}`}
          onClick={() => setTab("upcoming")}
        >
          Upcoming
        </button>
      </div>

      <div className="campaign-list">
        {(tab === "ongoing" ? ongoingCampaigns : upcomingCampaigns).map(
          (campaign) => (
            <div key={campaign.id} className="campaign-card">
              <h3 className="campaign-title">{campaign.title}</h3>
              <p className="campaign-description">{campaign.description}</p>
              <p className="campaign-date">{campaign.date}</p>
              <button className="join-btn">Join Campaign</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
