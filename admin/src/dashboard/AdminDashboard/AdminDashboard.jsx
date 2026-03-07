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
    <div className="dashboard-container">
      <div className="admin-layout">
        <AdminDrawer
          isSidebarOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="main-wrapper">
          <header className="top-nav">
            <div className="nav-left">
              <button
                className="menu-toggle-btn"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <FaBars />
              </button>
              <h2 className="page-title">Dashboard</h2>
            </div>

            <div className="nav-right">
              <div className="search-box">
                <FaSearch />
                <input type="text" placeholder="Search..." />
              </div>

              <button className="icon-btn">
                <FaBell />
                <span className="badge">3</span>
              </button>

              <div className="user-profile">
                <FaUserCircle className="avatar" />
                <div className="user-info">
                  <span className="name">Admin</span>
                  <span className="role">Administrator</span>
                </div>
              </div>

              <button className="icon-btn logout-btn" onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
            </div>
          </header>

          <main className="main-content">
            <div className="content-scroll-area">
              <div className="content-card">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;