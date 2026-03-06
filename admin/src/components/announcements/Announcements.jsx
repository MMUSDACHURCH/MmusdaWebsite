import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { getAllAnnouncements, deleteAnnouncement, getAnnouncementsByDate } from "../../Features/announcements/announcementsAPI";
import CreateAnnouncement from "./CreateAnnouncement";
import UpdateAnnouncement from "./UpdateAnnouncement";
import "./Announcements.css";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [filterDate, setFilterDate] = useState("");

  const fetchAnnouncements = async () => {
    try {
      const data = filterDate ? await getAnnouncementsByDate(filterDate) : await getAllAnnouncements();
      setAnnouncements(data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchAnnouncements(); }, [filterDate]);

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      fetchAnnouncements();
    } catch (err) { console.log(err); }
  };

  const openUpdate = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowUpdate(true);
  };

  return (
    <div className="announcements-page">
      <div className="announcements-header">
        <h2>Announcements</h2>
        <button className="create-btn" onClick={() => setShowCreate(true)}>Create</button>
        <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="date-filter"/>
      </div>

      {showCreate && <CreateAnnouncement onSuccess={() => { setShowCreate(false); fetchAnnouncements(); }} />}
      {showUpdate && selectedAnnouncement && (
        <UpdateAnnouncement
          announcement={selectedAnnouncement}
          onClose={() => setShowUpdate(false)}
          onSuccess={() => { setShowUpdate(false); fetchAnnouncements(); }}
        />
      )}

      <div className="table-container">
        <table className="announcements-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map(a => (
              <tr key={a.announcementId}>
                <td>{a.title}</td>
                <td>{a.description}</td>
                <td>{a.createdBy}</td>
                <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <FaEdit className="edit-icon" onClick={() => openUpdate(a)} />
                  <FaTrash className="delete-icon" onClick={() => handleDelete(a.announcementId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}