import React, { useState } from "react";
import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";
import "./NewPassword.css";

export default function NewPassword() {
  const email = new URLSearchParams(window.location.search).get("email");
  const code = new URLSearchParams(window.location.search).get("code");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setMessage(
        "Password must be 8+ chars, uppercase, lowercase, number & special"
      );
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${APIDomain}/api/auth/reset-password`, {
        email,
        newPassword: password
      });
      setMessage("Password reset successful");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="panel-title">RESET PASSWORD</h1>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-box">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}