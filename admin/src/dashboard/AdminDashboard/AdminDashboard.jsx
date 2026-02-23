import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDrawer from "./aside/AdminDrawer";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Left drawer */}
      <AdminDrawer />

      {/* Right content frame */}
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<h2>Welcome to Admin Dashboard</h2>} />
          {/* You can create pages like /departments, /events later */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;