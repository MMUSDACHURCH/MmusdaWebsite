// src/pages/AdminDashboard/AdminDashboard.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminDrawer from "../AdminDashboard/aside/AdminDrawer";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(true);

  const toggleDrawer = () => setIsDrawerExpanded((prev) => !prev);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* Navbar */}
        <Navbar />

        {/* Top Bar */}
        <div className="dashboard-topbar">
          <button onClick={toggleDrawer}>
            {isDrawerExpanded ? <IoCloseSharp /> : <FaBars />}
          </button>
          <h1>Welcome to Admin Dashboard</h1>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          <div className={`dashboard-drawer ${isDrawerExpanded ? "expanded" : "collapsed"}`}>
            <AdminDrawer isSidebarOpen={isDrawerExpanded} onToggle={toggleDrawer} />
          </div>
          <main className="dashboard-content">
            <Outlet />
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;