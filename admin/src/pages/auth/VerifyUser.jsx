import { useState } from "react";
import axios from "axios";
import "./VerifyUser.css";

export default function VerifyUser() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Verifying...");
    try {
      const res = await axios.post("/api/auth/verify", { email, code });
      setMessage(res.data.message);
      setTimeout(()=> window.location.href="/login",1500);
    } catch(err){
      setMessage(err.response?.data?.error || "Verification failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-card">
      <h2>Verify Account</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleVerify}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="text" placeholder="Verification Code" value={code} onChange={(e)=>setCode(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify"}</button>
      </form>
      <button className="link-btn" onClick={()=>window.history.back()}>Back</button>
    </div>
  );
}