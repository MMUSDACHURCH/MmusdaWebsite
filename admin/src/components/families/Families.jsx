import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { getAllFamilies, deleteFamily } from "../../Features/families/familiesAPI";
import CreateFamily from "./CreateFamily";
import UpdateFamily from "./UpdateFamily";
import "./Families.css";

export default function Families() {
  const [families, setFamilies] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(null);

  const fetchFamilies = async () => {
    try {
      const data = await getAllFamilies();
      setFamilies(data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchFamilies(); }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFamily(id);
      fetchFamilies();
    } catch (err) { console.log(err); }
  };

  const openUpdate = (family) => {
    setSelectedFamily(family);
    setShowUpdate(true);
  };

  return (
    <div className="families-page">
      <div className="families-header">
        <h2>Families</h2>
        <button className="create-btn" onClick={() => setShowCreate(true)}>Create Family</button>
      </div>

      {showCreate && <CreateFamily onSuccess={() => { setShowCreate(false); fetchFamilies(); }} />}
      {showUpdate && selectedFamily && (
        <UpdateFamily
          family={selectedFamily}
          onClose={() => setShowUpdate(false)}
          onSuccess={() => { setShowUpdate(false); fetchFamilies(); }}
        />
      )}

      <div className="table-container">
        <table className="families-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Family Name</th>
              <th>Head</th>
              <th>Contact</th>
              <th>Leader Contact</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {families.map(family => (
              <tr key={family.familyId}>
                <td>{family.photoUrl ? <img src={family.photoUrl} alt={family.familyName} className="family-photo"/> : "-"}</td>
                <td>{family.familyName}</td>
                <td>{family.headOfFamily}</td>
                <td>{family.contactInfo}</td>
                <td>{family.leaderContact}</td>
                <td>{family.description}</td>
                <td className="actions">
                  <FaEdit className="edit-icon" onClick={() => openUpdate(family)} />
                  <FaTrash className="delete-icon" onClick={() => handleDelete(family.familyId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}