import { useState } from "react";
import { AdminsAPI } from "../../Features/admins/adminsAPI";
import "./UpdateAdmin.css";

export default function UpdateAdmin({ admin, onClose, reloadAdmins }) {
  const [fullName, setFullName] = useState(admin.fullName);
  const [email, setEmail] = useState(admin.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AdminsAPI.updateAdmin(admin.adminId, { fullName, email });
    onClose();
    reloadAdmins();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Update Admin</h3>
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
              Update
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}