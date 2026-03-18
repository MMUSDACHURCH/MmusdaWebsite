import { useState } from "react";
import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";
import "./ResetCode.css";

export default function ResetCode() {
  const email = new URLSearchParams(window.location.search).get("email");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${APIDomain}/api/auth/verify-reset-code`, { email, code });
      setMessage(res.data.message);
      setTimeout(() => window.location.href = `/new-password?email=${email}&code=${code}`, 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error");
    }
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="panel-title">RESET PASSWORD PANEL</h1>
        <h2>Enter Reset Code</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Reset Code</label>
            <input
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button type="submit" className="register-btn">
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  )
}