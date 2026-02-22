import React from "react";
import AdminDrawer from "./AdminDrawer";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <AdminDrawer />

      <div className="dashboard-main">
        <h1 className="dashboard-title">Welcome, Admin!</h1>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h2>Departments</h2>
            <p>Manage all church departments.</p>
          </div>

          <div className="dashboard-card">
            <h2>Events</h2>
            <p>View and manage upcoming events.</p>
          </div>

          <div className="dashboard-card">
            <h2>Bookings</h2>
            <p>Track all reservations and bookings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;