import { useState } from "react";
import { updateAnnouncement } from "../../Features/announcements/announcementsAPI";
import "./UpdateAnnouncement.css";

export default function UpdateAnnouncement({ announcement, onClose, onSuccess }) {
  const [title, setTitle] = useState(announcement.title);
  const [description, setDescription] = useState(announcement.description);
  const [createdBy, setCreatedBy] = useState(announcement.createdBy);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAnnouncement(announcement.announcementId, { title, description, createdBy: parseInt(createdBy) });
      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="update-overlay">
      <div className="update-modal">
        <h3>Update Announcement</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
          <input type="number" value={createdBy} onChange={e => setCreatedBy(e.target.value)} required />
          <div className="update-actions">
            <button type="submit">Update</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}