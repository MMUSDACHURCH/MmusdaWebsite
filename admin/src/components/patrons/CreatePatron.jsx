import React, { useState } from "react";
import { PatronsAPI } from "../../Features/patrons/patronsAPI";
import "./CreatePatron.css";

const CreatePatron = ({ refresh }) => {
  const [form, setForm] = useState({ name: "", title: "", message: "", contactNumber: "", image: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImage = (file) => { setForm({ ...form, image: file }); setPreview(URL.createObjectURL(file)); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await PatronsAPI.createPatron(form);
    setForm({ name: "", title: "", message: "", contactNumber: "", image: null });
    setPreview(null);
    setLoading(false);
    refresh();
  };

  return (
    <form className="create-patron-form" onSubmit={handleSubmit}>
      <h2>Add Patron</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact Number" />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" />
      <input type="file" onChange={(e) => handleImage(e.target.files[0])} />
      {preview && <img src={preview} className="preview-image-circle" />}
      <button type="submit" className="submit-btn">{loading ? "Creating..." : "Create"}</button>
    </form>
  );
};

export default CreatePatron;