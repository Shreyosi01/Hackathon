import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <div className="admin-brand">CareSync Admin</div>
        <nav className="admin-nav">
          <NavLink to="/admin/reports" className="nav-item">All Reports</NavLink>
          <NavLink to="/admin/reports/trends" className="nav-item">Report Trends</NavLink>
          <NavLink to="/admin/reports/map" className="nav-item">Reports Map</NavLink>
          <NavLink to="/admin/appointments" className="nav-item">All Appointments</NavLink>
          <NavLink to="/admin/campaigns" className="nav-item">Campaign Management</NavLink>
        </nav>
      </aside>
      <main className="admin-content">
        <header className="admin-header">
          <h1>Admin Console</h1>
        </header>
        <div className="admin-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
