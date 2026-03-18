import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getAllSuggestions, deleteSuggestion } from "../../Features/suggestions/suggestionsAPI";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./Suggestions.css";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    try {
      const data = await getAllSuggestions();
      setSuggestions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSuggestion(id);
      fetchSuggestions();
    } catch (err) {
      console.log(err);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Suggestions List", 14, 22);

    const columns = ["Name", "Contact Number", "Message"];

    const rows = suggestions.map((s) => [
      s.name || "-",
      s.contactNumber || "-",
      s.message
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30
    });

    doc.save("suggestions.pdf");
  };

  return (
    <div className="suggestions-page">

      <div className="suggestions-header">
        <h2>Suggestions</h2>
        <button className="download-btn" onClick={exportPDF}>
          Download PDF
        </button>
      </div>

      <div className="table-container">
        <table className="suggestions-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {suggestions.map((s) => (
              <tr key={s.suggestionId}>
                <td>{s.name || "-"}</td>
                <td>{s.contactNumber || "-"}</td>
                <td>{s.message}</td>
                <td className="actions">
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(s.suggestionId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}