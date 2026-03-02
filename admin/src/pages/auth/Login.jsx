import { useState } from "react";
import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Email is required");
    if (!password) return setMessage("Password is required");

    setLoading(true);
    setMessage("Logging in...");
    try {
      const res = await axios.post(`${APIDomain}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      setTimeout(() => window.location.href = "/dashboard", 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="show-hide" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      <div className="links">
        <button onClick={() => window.location.href="/register"}>Don't have an account? Register</button>
        <button onClick={() => window.location.href="/forgot-password"}>Forgot Password?</button>
      </div>
    </div>
  );
}