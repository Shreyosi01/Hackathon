import React, { useState, useEffect } from "react";
import api from "../api"; // your Axios instance
import "./Campaigns.css";

export default function Campaigns() {
  const [tab, setTab] = useState("ongoing");
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await api.get("/campaigns");
        setCampaigns(res.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    };
    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter(c => c.status === tab);

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
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <h3 className="campaign-title">{campaign.title}</h3>
            <p className="campaign-description">{campaign.description}</p>
            <p className="campaign-date">{campaign.date}</p>
            <button className="join-btn">Join Campaign</button>
          </div>
        ))}
      </div>
    </div>
  );
}