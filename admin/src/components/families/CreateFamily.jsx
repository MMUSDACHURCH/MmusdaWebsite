import { useState } from "react";
import { createFamily } from "../../Features/families/familiesAPI";
import "./CreateFamily.css";

export default function CreateFamily({ onSuccess }) {
  const [familyName, setFamilyName] = useState("");
  const [headOfFamily, setHeadOfFamily] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [leaderContact, setLeaderContact] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createFamily({ familyName, headOfFamily, contactInfo, leaderContact, photoUrl, description });
      setFamilyName(""); setHeadOfFamily(""); setContactInfo(""); setLeaderContact(""); setPhotoUrl(""); setDescription("");
      setMessage("Family created successfully");
      if(onSuccess) onSuccess();
    } catch (err) {
      console.log(err);
      setMessage("Failed to create family");
    }
    setLoading(false);
  };

  return (
    <div className="create-family">
      <h2>Create Family</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Family Name" value={familyName} onChange={e => setFamilyName(e.target.value)} required />
        <input type="text" placeholder="Head of Family" value={headOfFamily} onChange={e => setHeadOfFamily(e.target.value)} required />
        <input type="text" placeholder="Contact Info" value={contactInfo} onChange={e => setContactInfo(e.target.value)} />
        <input type="text" placeholder="Leader Contact" value={leaderContact} onChange={e => setLeaderContact(e.target.value)} />
        <input type="text" placeholder="Photo URL" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}