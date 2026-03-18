import { useState } from "react";
import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";
import "./VerifyUser.css";

export default function VerifyUser() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${APIDomain}/api/auth/verify`, { email, code });
      setMessage(res.data.message);
      setTimeout(() => window.location.href="/login", 1500);
    } catch(err) {
      setMessage(err.response?.data?.error || "Verification failed");
    }
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="panel-title">VERIFY ACCOUNT PANEL</h1>
        <h2>Verify Account</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleVerify}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Registered Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Verification Code</label>
            <input
              type="text"
              placeholder="Enter Verification Code"
              value={code}
              onChange={(e)=>setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn">{loading ? "Verifying..." : "Verify"}</button>
        </form>
      </div>
    </div>
  );
}