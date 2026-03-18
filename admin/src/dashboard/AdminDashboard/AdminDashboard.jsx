import React, { useState, useEffect } from "react";
import AdminDrawer from "./aside/AdminDrawer";
import { Outlet } from "react-router-dom";
import { FaBell, FaUserCircle, FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <div className="admin-layout">
        <AdminDrawer
          isSidebarOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="main-viewport">
          <header className="top-bar">
            <div className="top-bar-left">
              <button className="mobile-menu-trigger" onClick={() => setIsSidebarOpen(true)}>
                <FaBars />
              </button>
              <h2 className="view-title">WELCOME TO MMUSDA ADMIN DASHBOARD</h2>
            </div>

            <div className="top-bar-right">
              <div className="search-container">
                <FaSearch />
                <input type="text" placeholder="Search data..." />
              </div>

              <button className="action-icon">
                <FaBell />
                <span className="dot">3</span>
              </button>

              <div className="profile-chip">
                <FaUserCircle className="user-avatar" />
                <div className="profile-text">
                  <span className="user-name">Admin</span>
                  <span className="user-role">Super User</span>
                </div>
              </div>

              <button className="action-icon logout-trigger" onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
            </div>
          </header>

          <main className="scroll-content">
            <div className="content-wrapper">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;