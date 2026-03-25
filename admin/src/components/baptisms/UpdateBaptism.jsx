import React, { useState } from "react";
import { BaptismsAPI } from "../../Features/baptisms/baptismsAPI";
import "./UpdateBaptism.css";

const UpdateBaptism = ({ record, refresh, close }) => {
  const [form, setForm] = useState({
    fullName: record.fullName,
    email: record.email || "",
    phoneNumber: record.phoneNumber,
    dob: record.dob || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await BaptismsAPI.update(record.baptismId, form);
    setLoading(false);
    refresh();
    close();
  };

  return (
    <div className="update-overlay">
      <form className="update-form" onSubmit={handleSubmit}>
        <h2>Update Candidate</h2>
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone" required />
        <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
        <button type="submit" className="submit-btn">{loading ? "Updating..." : "Update"}</button>
        <button type="button" className="cancel-btn" onClick={close}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateBaptism;