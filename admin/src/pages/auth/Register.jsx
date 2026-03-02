import { useState } from "react";
import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Email is required");
    if (!password) return setMessage("Password is required");
    if (!validatePassword(password)) return setMessage("Password must be 8+ chars, uppercase, lowercase, number & special");
    if (password !== confirm) return setMessage("Passwords do not match");

    setLoading(true);
    setMessage("Registering...");
    try {
      const res = await axios.post(`${APIDomain}/api/auth/register`, { email, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <span className="show-hide" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>
        </div>
        <div className="password-container">
          <input type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required />
          <span className="show-hide" onClick={()=>setShowConfirm(!showConfirm)}>{showConfirm ? "Hide" : "Show"}</span>
        </div>
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
      <div className="links">
        <button onClick={()=>window.location.href="/login"}>Already have an account? Login</button>
      </div>
    </div>
  );
}