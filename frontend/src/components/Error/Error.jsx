import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-text">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="error-btn">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
