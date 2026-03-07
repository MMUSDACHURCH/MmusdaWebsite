import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminsAPI } from "../../Features/admins/adminsAPI";
import "./Admins.css";

export default function CreateAdmin() {
  const navigate = useNavigate();

  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await AdminsAPI.createAdmin({
      fullName,
      email
    });

    navigate("/admins");
  };

  return (
    <div className="form-page">
      <h2>Create Admin</h2>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e)=>setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button>Create</button>
      </form>
    </div>
  );
}