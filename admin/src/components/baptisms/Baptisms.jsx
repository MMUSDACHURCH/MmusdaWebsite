import React, { useEffect, useState } from "react";
import { BaptismsAPI } from "../../Features/baptisms/baptismsAPI";
import CreateBaptism from "./CreateBaptism";
import UpdateBaptism from "./UpdateBaptism";
import "./Baptisms.css";

const Baptisms = () => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const fetchRecords = async () => {
    const data = await BaptismsAPI.getAll();
    setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      setLoadingId(id);
      await BaptismsAPI.delete(id);
      setLoadingId(null);
      fetchRecords();
    }
  };

  return (
    <div className="baptisms-container">
      <h1>Baptism Registry</h1>
      <div className="baptisms-grid">
        {records.map((record) => (
          <div key={record.baptismId} className="baptism-card">
            <div className="baptism-avatar">
               {record.fullName.charAt(0)}
            </div>
            <h3>{record.fullName}</h3>
            <p><strong>Phone:</strong> {record.phoneNumber}</p>
            <p><strong>DOB:</strong> {record.dob}</p>
            <div className="baptism-actions">
              <button className="edit-btn" onClick={() => setEditingRecord(record)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(record.baptismId)} disabled={loadingId === record.baptismId}>
                {loadingId === record.baptismId ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <CreateBaptism refresh={fetchRecords} />
      {editingRecord && (
        <UpdateBaptism record={editingRecord} refresh={fetchRecords} close={() => setEditingRecord(null)} />
      )}
    </div>
  );
};

export default Baptisms;