import React, { useState } from "react";
import { MembershipTransfersAPI } from "../../Features/membershipTransfers/membershipTransfersAPI";
import "./UpdateTransfer.css";

const UpdateTransfer = ({ record, refresh, close }) => {
  const [form, setForm] = useState({ ...record });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await MembershipTransfersAPI.update(record.transferId, form);
      refresh();
      close();
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating record. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-overlay">
      <form className="update-form" onSubmit={handleSubmit}>
        <h2>Update Transfer Details</h2>
        
        <label>Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} required />
        
        <label>Phone Number</label>
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
        
        <label>Destination Church</label>
        <input name="toChurch" value={form.toChurch} onChange={handleChange} required />
        
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Saving..." : "Update Record"}
        </button>
        <button type="button" className="cancel-btn" onClick={close} disabled={loading}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateTransfer;