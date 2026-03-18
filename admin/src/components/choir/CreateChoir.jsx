import { useState } from "react";
import { createChoir } from "../../Features/choirs/choirsAPI";
import "./CreateChoir.css"

export default function CreateChoir({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    leaderName: "",
    membersCount: 0,
    videoUrl: "",
    choirPhoto: "",
    description: ""
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form };
    if (file) payload.choirPhoto = file;

    try {
      await createChoir(payload);
      alert("Choir created successfully!");
      setForm({ name: "", leaderName: "", membersCount: 0, videoUrl: "", choirPhoto: "", description: "" });
      setFile(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("Error creating choir");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createChoir">
      <h2>Create Choir</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Choir Name" value={form.name} onChange={handleChange} required />
        <input name="leaderName" placeholder="Leader Name" value={form.leaderName} onChange={handleChange} required />
        <input name="membersCount" type="number" value={form.membersCount} onChange={handleChange} />
        <input name="videoUrl" placeholder="YouTube URL" value={form.videoUrl} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input name="choirPhoto" placeholder="Or Image URL" value={form.choirPhoto} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</button>
      </form>
    </div>
  );
}