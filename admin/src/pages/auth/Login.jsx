import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { APIDomain } from "../../utils/APIDomain";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email || !password) {
      return setMessage("Please fill in all fields to Login");
    }
    setLoading(true);
    try {
      const res = await axios.post(`${APIDomain}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>WELCOME TO MMUSDA ADMIN LOGIN PAGE</h2>
        <p className="subtitle">Welcome back! Please enter your details to Login.</p>

        {message && <div className="message-banner">{message}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-pass"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="loader"></span> : "Login to Dashboard"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register" className="black-link">Register</Link>
          </p>
          <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}