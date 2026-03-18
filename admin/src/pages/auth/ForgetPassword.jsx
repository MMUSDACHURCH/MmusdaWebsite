import { useState } from "react";
import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";
import "./ForgetPassword.css";

export default function ForgetPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Email required");

    setLoading(true);
    try {
      const res = await axios.post(`${APIDomain}/api/auth/forgot-password`, { email });
      setMessage(res.data.message);
      setTimeout(() => window.location.href = `/reset-code?email=${email}`, 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="panel-title">FORGOT PASSWORD PANEL</h1>
        <h2>Enter your registered email</h2>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="register-btn">
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      </div>
    </div>
  );
}