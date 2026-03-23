import { useState } from "react";
import { AdminsAPI } from "../../Features/admins/adminsAPI";
import "./CreateAdmin.css";

export default function CreateAdmin({ reloadAdmins }) {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AdminsAPI.createAdmin({ fullName, email });
    setFullName("");
    setEmail("");
    setOpen(false);
    reloadAdmins();
  };

  return (
    <div className="create-admin">
      <button className="open-btn" onClick={() => setOpen(true)}>
        + Add Admin
      </button>

      {open && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create Admin</h3>
            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  Create
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}