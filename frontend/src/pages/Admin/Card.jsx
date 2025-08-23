// src/pages/Admin/Card.jsx
import React from "react";
import "./AdminDashboard.css";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`admin-card ${className}`}
      tabIndex={0}
      {...props}
      aria-label={props["aria-label"] || "Card"}
    >
      {children}
    </div>
  );
}
