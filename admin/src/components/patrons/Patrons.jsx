import React, { useEffect, useState } from "react";
import { PatronsAPI } from "../../Features/patrons/patronsAPI";
import CreatePatron from "./CreatePatron";
import UpdatePatron from "./UpdatePatron";
import "./Patrons.css";

const Patrons = () => {
  const [patrons, setPatrons] = useState([]);
  const [editingPatron, setEditingPatron] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const fetchPatrons = async () => {
    const data = await PatronsAPI.getAllPatrons();
    setPatrons(data);
  };

  useEffect(() => {
    fetchPatrons();
  }, []);

  const handleDelete = async (id) => {
    setLoadingId(id);
    await PatronsAPI.deletePatron(id);
    setLoadingId(null);
    fetchPatrons();
  };

  return (
    <div className="patrons-container">
      <h1>Our Patrons</h1>
      <div className="patrons-grid">
        {patrons.map((patron) => (
          <div key={patron.patronId} className="patron-card">
            {patron.image && <img src={patron.image} className="patron-image-circle" />}
            <h2>{patron.name}</h2>
            <p className="patron-info"><strong>{patron.title}</strong></p>
            <p className="patron-info">{patron.contactNumber}</p>
            <p className="patron-info">{patron.message}</p>
            <div className="patron-actions">
              <button className="edit-btn" onClick={() => setEditingPatron(patron)}>Edit</button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(patron.patronId)}
                disabled={loadingId === patron.patronId}
              >
                {loadingId === patron.patronId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <CreatePatron refresh={fetchPatrons} />
      {editingPatron && (
        <UpdatePatron
          patron={editingPatron}
          refresh={fetchPatrons}
          close={() => setEditingPatron(null)}
        />
      )}
    </div>
  );
};

export default Patrons;