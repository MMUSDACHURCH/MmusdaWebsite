import React, { useState } from "react";
import { PatronsAPI } from "../../Features/patrons/patronsAPI";
import "./UpdatePatron.css";

const UpdatePatron = ({ patron, refresh, close }) => {
  const [form, setForm] = useState({
    name: patron.name,
    title: patron.title,
    message: patron.message || "",
    contactNumber: patron.contactNumber || "",
    image: null,
  });
  const [preview, setPreview] = useState(patron.image);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImage = (file) => { setForm({ ...form, image: file }); setPreview(URL.createObjectURL(file)); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await PatronsAPI.updatePatron(patron.patronId, form);
    setLoading(false);
    refresh();
    close();
  };

  return (
    <div className="update-overlay">
      <form className="update-form" onSubmit={handleSubmit}>
        <h2>Update Patron</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact Number" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" />
        <input type="file" onChange={(e) => handleImage(e.target.files[0])} />
        {preview && <img src={preview} className="preview-image-circle" />}
        <button type="submit" className="submit-btn">{loading ? "Updating..." : "Update"}</button>
        <button type="button" className="cancel-btn" onClick={close}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdatePatron;