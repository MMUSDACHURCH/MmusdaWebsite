import { useState } from "react";
import { createMember } from "../../Features/members/membersAPI";
import "./CreateMember.css";

export default function CreateMember({ onSuccess }) {
  const [name, setName] = useState("");
  const [areaOfResidence, setAreaOfResidence] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMember({ name, areaOfResidence, email, phone });
      setName(""); setAreaOfResidence(""); setEmail(""); setPhone("");
      onSuccess();
    } catch (err) { console.log(err); }
  };

  return (
    <div className="create-member">
      <h2>Create Member</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="Area of Residence" value={areaOfResidence} onChange={e => setAreaOfResidence(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}