import { useState } from "react";
import { createAnnouncement } from "../../Features/announcements/announcementsAPI";
import "./CreateAnnouncement.css";

export default function CreateAnnouncement({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement({ title, description, createdBy: parseInt(createdBy) });
      setTitle(""); setDescription(""); setCreatedBy("");
      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-announcement">
      <h2>Create Announcement</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="number" placeholder="Created By (User ID)" value={createdBy} onChange={e => setCreatedBy(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}