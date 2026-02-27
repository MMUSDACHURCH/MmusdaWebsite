import { useState } from "react";
import { createMember } from "../../Features/members/membersAPI";
import "./Members.css";

const Members = () => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const memberData = { name, areaOfResidence: area, email, phone };
      const newMember = await createMember(memberData);
      setMessage(`Member ${newMember.name} created successfully!`);
      setName("");
      setArea("");
      setEmail("");
      setPhone("");
    } catch (err) {
      setMessage("Failed to create member: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="members-container">
      <h2 className="members-title">Add New Member</h2>
      <form onSubmit={handleSubmit} className="members-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Area of Residence"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Member"}
        </button>
      </form>
      {message && <p className="members-message">{message}</p>}
    </div>
  );
};

export default Members;