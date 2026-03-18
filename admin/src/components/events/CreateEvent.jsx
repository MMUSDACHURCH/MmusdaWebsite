import React, { useState } from "react";
import { EventsAPI } from "../../Features/events/eventsAPI";
import "./Events.css";

const CreateEvent = ({ onCreated }) => {
  const [form, setForm] = useState({ title: "", description: "", eventDate: "", photo: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const change = e => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setForm({ ...form, photo: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    const newEvent = await EventsAPI.createEvent(form);
    onCreated(newEvent);
    setForm({ title: "", description: "", eventDate: "", photo: null });
    setPreview(null);
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="event-form">
      <h3>Create Event</h3>
      <input type="text" name="title" value={form.title} onChange={change} required placeholder="Title" />
      <textarea name="description" value={form.description} onChange={change} placeholder="Description" />
      <input type="date" name="eventDate" value={form.eventDate} onChange={change} required />
      <input type="file" name="photo" accept="image/*" onChange={change} />
      {preview && <img src={preview} alt="Preview" className="event-img-preview" />}
      <button disabled={loading}>{loading ? "Creating..." : "Create Event"}</button>
    </form>
  );
};

export default CreateEvent;