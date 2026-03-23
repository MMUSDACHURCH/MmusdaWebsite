import React, { useState } from "react";
import { updatePastor } from "../../Features/pastors/pastorsAPI";
import "./CreateUpdatePastor.css";

const UpdatePastor = ({ pastor, refresh, close }) => {
  const [form, setForm] = useState({
    name: pastor.name,
    title: pastor.title,
    message: pastor.message || "",
    contactNumber: pastor.contactNumber || "",
    image: null,
  });
  const [preview, setPreview] = useState(pastor.image);
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
    await updatePastor(pastor.pastorId, form);
    setLoading(false);
    refresh();
    close();
  };

  return (
    <div className="update-overlay scrollable">
      <form className="pastor-form update-form" onSubmit={handleSubmit}>
        <h2>Update Pastor</h2>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact Number" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" />

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

export default UpdatePastor;