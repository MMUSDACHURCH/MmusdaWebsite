import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getAllMembers, deleteMember, getMembersByArea } from "../../Features/members/membersAPI";
import CreateMember from "./CreateMember";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./Members.css";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [areaFilter, setAreaFilter] = useState("");

  const fetchMembers = async () => {
    try {
      const data = areaFilter ? await getMembersByArea(areaFilter) : await getAllMembers();
      setMembers(data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchMembers(); }, [areaFilter]);

  const handleDelete = async (id) => {
    try {
      await deleteMember(id);
      fetchMembers();
    } catch (err) { console.log(err); }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Members List", 14, 22);
    doc.setFontSize(12);
    const tableColumn = ["Name", "Area", "Email", "Phone"];
    const tableRows = members.map(m => [m.name, m.areaOfResidence, m.email || "-", m.phone || "-"]);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 30 });
    doc.save("members.pdf");
  };

  return (
    <div className="members-page">
      <div className="members-header">
        <h2>Members</h2>
        <div className="header-actions">
          <button className="create-btn" onClick={() => setShowCreate(true)}>Create Member</button>
          <input type="text" placeholder="Filter by Area" value={areaFilter} onChange={e => setAreaFilter(e.target.value)} />
          <button className="pdf-btn" onClick={exportPDF}>Download PDF</button>
        </div>
      </div>

      {showCreate && <CreateMember onSuccess={() => { setShowCreate(false); fetchMembers(); }} />}

      <div className="table-container">
        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Area</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.memberId}>
                <td>{m.name}</td>
                <td>{m.areaOfResidence}</td>
                <td>{m.email || "-"}</td>
                <td>{m.phone || "-"}</td>
                <td className="actions">
                  <FaTrash className="delete-icon" onClick={() => handleDelete(m.memberId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}