// src/pages/Admin/AdminDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "./AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
