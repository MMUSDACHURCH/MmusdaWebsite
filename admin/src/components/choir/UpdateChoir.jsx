import { useState, useEffect } from "react";
import { updateChoir } from "../../Features/choirs/choirsAPI";
import "./UpdateChoir.css"

export default function UpdateChoir({ choir, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    leaderName: "",
    membersCount: 0,
    videoUrl: "",
    choirPhoto: "",
    description: ""
  });
  const [file, setFile] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (choir) {
      setForm({
        name: choir.name || "",
        leaderName: choir.leaderName || "",
        membersCount: choir.membersCount || 0,
        videoUrl: choir.videoUrl || "",
        choirPhoto: choir.choirPhoto || "",
        description: choir.description || ""
      });
    }
  }, [choir]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const payload = { ...form };
    if (file) payload.choirPhoto = file;

    try {
      await updateChoir(choir.choirId, payload);
      alert("Choir updated successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("Error updating choir");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="updateChoir">
      <h2>Update Choir</h2>
      <form onSubmit={handleUpdate}>
        <input name="name" value={form.name} onChange={handleChange} required />
        <input name="leaderName" value={form.leaderName} onChange={handleChange} required />
        <input name="membersCount" type="number" value={form.membersCount} onChange={handleChange} />
        <input name="videoUrl" value={form.videoUrl} onChange={handleChange} />
        <input type="file" onChange={handleFileChange} />
        <textarea name="description" value={form.description} onChange={handleChange} />
        <button type="submit" disabled={updating}>{updating ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
}