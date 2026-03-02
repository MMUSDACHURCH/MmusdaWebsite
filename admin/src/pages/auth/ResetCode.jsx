import { useState } from "react";
import axios from "axios";
import "./ResetCode.css";

export default function ResetCode() {
  const email = new URLSearchParams(window.location.search).get("email");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Verifying code...");
    try {
      const res = await axios.post("/api/auth/verify", { email, code });
      setMessage(res.data.message);
      setTimeout(()=> window.location.href=`/new-password?email=${email}&code=${code}`,1500);
    } catch(err){
      setMessage(err.response?.data?.error || "Error");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-card">
      <h2>Verify Reset Code</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Reset Code" value={code} onChange={(e)=>setCode(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify Code"}</button>
      </form>
      <button className="link-btn" onClick={()=>window.history.back()}>Back</button>
    </div>
  );
}