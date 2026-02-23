import React from "react";
import { adminDrawerData } from "./drawerData";
import { NavLink } from "react-router-dom";
import "./AdminDrawer.css";

const AdminDrawer = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="drawer">
      <div className="drawer-header">Admin Panel</div>

      <nav className="drawer-nav">
        {adminDrawerData.map((item) => (
          <NavLink
            key={item.id}
            to={`/dashboard/${item.link}`}
            className={({ isActive }) =>
              `drawer-item ${isActive ? "active" : ""}`
            }
          >
            {item.icon && <item.icon className="drawer-icon" />}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="drawer-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDrawer;