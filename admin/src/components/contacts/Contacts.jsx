import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getAllContacts, deleteContact } from "../../Features/contacts/contactsAPI";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./Contacts.css";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const data = await getAllContacts();
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Contacts List", 14, 22);
    doc.setFontSize(12);

    const tableColumn = ["Name", "Email", "Phone", "Message"];
    const tableRows = contacts.map(c => [c.name, c.email, c.phone || "-", c.message || "-"]);

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 30 });
    doc.save("contacts.pdf");
  };

  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <h2>Contacts</h2>
        <button className="pdf-btn" onClick={exportPDF}>Download PDF</button>
      </div>

      <div className="table-container">
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c.contactId}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone || "-"}</td>
                <td>{c.message || "-"}</td>
                <td className="actions">
                  <FaTrash className="delete-icon" onClick={() => handleDelete(c.contactId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}