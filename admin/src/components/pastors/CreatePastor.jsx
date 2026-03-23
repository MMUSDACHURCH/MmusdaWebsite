import React, { useState } from "react";
import { createPastor } from "../../Features/pastors/pastorsAPI";
import "./CreateUpdatePastor.css";

const CreatePastor = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    message: "",
    contactNumber: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
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
    await createPastor(form);
    setForm({ name: "", title: "", message: "", contactNumber: "", image: null });
    setPreview(null);
    setLoading(false);
    refresh();
  };

  return (
    <form className="pastor-form" onSubmit={handleSubmit}>
      <h2>Add Pastor</h2>

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

export default CreatePastor;