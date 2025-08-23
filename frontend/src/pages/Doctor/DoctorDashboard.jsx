import React, { useState } from "react";
import "./DoctorDashboard.css";
import AppointmentsPanel from "./components/AppointmentsPanel";
import PatientsPanel from "./components/PatientsPanel";
import ReportsMapPanel from "./components/ReportsMapPanel";

export default function DoctorDashboard() {
  const [tab, setTab] = useState("appointments"); // appointments | patients | map

  return (
    <div className="doctor-root">
      <header className="doctor-topbar">
        <div className="brand">CareSync • Doctor Console</div>
        <div className="tabs">
          <button
            className={`tab ${tab === "appointments" ? "active" : ""}`}
            onClick={() => setTab("appointments")}
          >
            Appointments
          </button>
          <button
            className={`tab ${tab === "patients" ? "active" : ""}`}
            onClick={() => setTab("patients")}
          >
            Patients & Reports
          </button>
          <button
            className={`tab ${tab === "map" ? "active" : ""}`}
            onClick={() => setTab("map")}
          >
            Reports Map
          </button>
        </div>
      </header>

      <main className="doctor-content">
        {tab === "appointments" && <AppointmentsPanel />}
        {tab === "patients" && <PatientsPanel />}
        {tab === "map" && <ReportsMapPanel />}
      </main>
    </div>
  );
}
