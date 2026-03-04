// src/pages/AdminDashboard/AdminDashboard.jsx
import React, { useState } from "react";
import AdminDrawer from "../AdminDashboard/aside/AdminDrawer";
//import Navbar from "../../components/navbar/Navbar";
//import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // drawer visibility for mobile
  const [activeContent, setActiveContent] = useState(null); // track which menu item is active

  const handleMenuClick = (id) => {
    setActiveContent(id);
    if (window.innerWidth < 768) {
      setIsDrawerOpen(false); // hide drawer on mobile
    }
  };

  const handleCloseContent = () => {
    setActiveContent(null);
    if (window.innerWidth < 768) {
      setIsDrawerOpen(true); // show drawer back
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Drawer */}
      <AdminDrawer
        isSidebarOpen={isDrawerOpen}
        onToggle={() => setIsDrawerOpen((prev) => !prev)}
        onMenuClick={handleMenuClick}
        activeContent={activeContent}
      />

      {/* Main content */}
      <div
        className={`dashboard-main ${
          isDrawerOpen ? "drawer-open" : "drawer-closed"
        }`}
      >
        

        {/* Close icon for mobile when content is active */}
        {activeContent && window.innerWidth < 768 && (
          <div className="mobile-close" onClick={handleCloseContent}>
            ✕
          </div>
        )}

        <main className="dashboard-content">
          {/* Render active content or Outlet */}
          {activeContent ? (
            <div className="active-content">
              <h2>{activeContent}</h2>
              <p>
                This is the content for <strong>{activeContent}</strong>. It
                fills the screen when menu is hidden on small devices.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>

        
      </div>
    </div>
  );
};

export default AdminDashboard;