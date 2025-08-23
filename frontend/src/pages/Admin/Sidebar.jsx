// src/pages/Admin/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminDashboard.css";

const links = [
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/reports/trends", label: "Report Trends" },
  { to: "/admin/reports/map", label: "Report Map" },
  { to: "/admin/appointments", label: "Appointments" },
  { to: "/admin/campaigns", label: "Campaign Management" },
];

export default function Sidebar() {
  return (
    <aside className="admin-sidebar" aria-label="Admin sidebar">
      <div className="admin-sidebar-title">Admin</div>
      <nav>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
            tabIndex={0}
            aria-label={l.label}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
