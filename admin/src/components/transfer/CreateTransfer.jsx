import React, { useState } from "react";
import { MembershipTransfersAPI } from "../../Features/membershipTransfers/membershipTransfersAPI";
import "./CreateTransfer.css";

const CreateTransfer = ({ refresh }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    fromChurch: "",
    toChurch: "",
    destinationDistrict: "",
    destinationConference: "",
    destinationLocation: "",
    reason: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await MembershipTransfersAPI.create(form);
    setForm({
      fullName: "", email: "", phoneNumber: "", fromChurch: "", toChurch: "",
      destinationDistrict: "", destinationConference: "", destinationLocation: "", reason: ""
    });
    setLoading(false);
    refresh();
  };

  return (
    <form className="create-transfer-form" onSubmit={handleSubmit}>
      <h2>New Transfer Request</h2>
      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" />
      <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
      <input name="fromChurch" value={form.fromChurch} onChange={handleChange} placeholder="Current Church" required />
      <input name="toChurch" value={form.toChurch} onChange={handleChange} placeholder="Destination Church" required />
      <input name="destinationDistrict" value={form.destinationDistrict} onChange={handleChange} placeholder="District" required />
      <input name="destinationConference" value={form.destinationConference} onChange={handleChange} placeholder="Conference" required />
      <input name="destinationLocation" value={form.destinationLocation} onChange={handleChange} placeholder="Physical Location" required />
      <textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Reason for transfer (Optional)" />
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? "Processing..." : "Submit Request"}
      </button>
    </form>
  );
};

export default CreateTransfer;