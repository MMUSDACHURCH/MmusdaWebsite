import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminDrawerData } from "./drawerData";
import { FaTimes } from "react-icons/fa";
import "./AdminDrawer.css";

const AdminDrawer = ({ isSidebarOpen, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 1024) {
      onToggle();
    }
  };

  return (
    <>
      <div 
        className={`drawer-overlay ${isSidebarOpen ? "active" : ""}`} 
        onClick={onToggle}
      />
      <aside className={`drawer ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="drawer-header">
          {isSidebarOpen && <h2 className="drawer-title">Church Admin</h2>}
          <button onClick={onToggle} className="toggle-btn">
            {isSidebarOpen ? <FaTimes /> : "❯"}
          </button>
        </div>

        <nav className="drawer-nav">
          {adminDrawerData.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className="drawer-item"
              onClick={handleLinkClick}
            >
              <item.icon className="item-icon" />
              {isSidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}

          <button className="drawer-item logout" onClick={handleLogout}>
            <span className="item-icon">🚪</span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </nav>

        <div className="drawer-footer">
          © {new Date().getFullYear()}
        </div>
      </aside>
    </>
  );
};

export default AdminDrawer;