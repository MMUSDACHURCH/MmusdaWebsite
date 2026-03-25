import React, { useState } from "react";
import { BaptismsAPI } from "../../Features/baptisms/baptismsAPI";
import "./CreateBaptism.css";

const CreateBaptism = ({ refresh }) => {
  const [form, setForm] = useState({ fullName: "", email: "", phoneNumber: "", dob: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await BaptismsAPI.create(form);
    setForm({ fullName: "", email: "", phoneNumber: "", dob: "" });
    setLoading(false);
    refresh();
  };

  return (
    <form className="create-baptism-form" onSubmit={handleSubmit}>
      <h2>Request Baptism</h2>
      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
      <div className="date-input-group">
        <label>Date of Birth</label>
        <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
      </div>
      <button type="submit" className="submit-btn">{loading ? "Submitting..." : "Register"}</button>
    </form>
  );
};

export default CreateBaptism;