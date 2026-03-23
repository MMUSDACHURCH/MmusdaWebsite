import React, { useState } from "react";
import { updateElder } from "../../Features/elders/eldersAPI";
import "./CreateUpdate.css";

const UpdateElder = ({ elder, refresh, close }) => {
  const [form, setForm] = useState({
    name: elder.name,
    role: elder.role,
    message: elder.message || "",
    contactNumber: elder.contactNumber || "",
    image: null,
  });
  const [preview, setPreview] = useState(elder.image);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateElder(elder.elderId, form);
    setLoading(false);
    refresh();
    close();
  };

  return (
    <div className="update-overlay scrollable">
      <form className="elder-form update-form" onSubmit={handleSubmit}>
        <h2>Update Elder</h2>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
        <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact Number" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message from elder" />

        <input type="file" onChange={(e) => handleImage(e.target.files[0])} />
        {preview && <img src={preview} className="preview-image-circle" />}

        <div className="update-actions">
          <button type="submit" className="submit-btn">{loading ? "Updating..." : "Update"}</button>
          <button type="button" className="cancel-btn" onClick={close}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateElder;