import React, { useState } from "react";
import { createElder } from "../../Features/elders/eldersAPI";
import "./CreateUpdate.css";

const CreateElder = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    role: "",
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
    await createElder(form);
    setLoading(false);
    setForm({
      name: "",
      role: "",
      message: "",
      contactNumber: "",
      image: null,
    });
    setPreview(null);
    refresh();
  };

  return (
    <form className="elder-form scrollable" onSubmit={handleSubmit}>
      <h2>Add Elder</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
      <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact Number" />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message from elder" />

      <input type="file" onChange={(e) => handleImage(e.target.files[0])} />
      {preview && <img src={preview} className="preview-image-circle" />}

      <button type="submit" className="submit-btn">{loading ? "Creating..." : "Create"}</button>
    </form>
  );
};

export default CreateElder;