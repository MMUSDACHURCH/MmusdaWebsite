import React, { useState, useEffect } from "react";
import { EventsAPI } from "../../Features/events/eventsAPI";
import "./Events.css";

const UpdateEvent = ({ eventData, onUpdated }) => {
  const [form, setForm] = useState({
    title: eventData.title || "",
    description: eventData.description || "",
    eventDate: eventData.eventDate?.slice(0, 10) || "",
    photo: null
  });
  const [preview, setPreview] = useState(eventData.photo || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreview(eventData.photo || null);
  }, [eventData]);

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
    const updated = await EventsAPI.updateEvent(eventData.eventId, form);
    onUpdated(updated);
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="event-form">
      <h3>Update Event</h3>
      <input type="text" name="title" value={form.title} onChange={change} required />
      <textarea name="description" value={form.description} onChange={change} />
      <input type="date" name="eventDate" value={form.eventDate} onChange={change} required />
      <input type="file" name="photo" accept="image/*" onChange={change} />
      {preview && <img src={preview} alt="Preview" className="event-img-preview" />}
      <button disabled={loading}>{loading ? "Updating..." : "Update Event"}</button>
    </form>
  );
};

export default UpdateEvent;