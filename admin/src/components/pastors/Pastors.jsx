import React, { useEffect, useState } from "react";
import { getAllPastors, deletePastor } from "../../Features/pastors/pastorsAPI";
import CreatePastor from "./CreatePastor";
import UpdatePastor from "./UpdatePastor";
import "./Pastors.css";

const Pastors = () => {
  const [pastors, setPastors] = useState([]);
  const [editingPastor, setEditingPastor] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const fetchPastors = async () => {
    const data = await getAllPastors();
    setPastors(data);
  };

  useEffect(() => {
    fetchPastors();
  }, []);

  const handleDelete = async (id) => {
    setLoadingId(id);
    await deletePastor(id);
    setLoadingId(null);
    fetchPastors();
  };

  return (
    <div className="pastors-container">
      <h1>Message From the Pastor</h1>

      <div className="pastors-grid">
        {pastors.map((pastor) => (
          <div key={pastor.pastorId} className="pastor-card">
            {pastor.image && <img src={pastor.image} className="pastor-image-circle" />}
            <h2>{pastor.name}</h2>
            <p className="pastor-info"><strong>{pastor.title}</strong></p>
            <p className="pastor-info">{pastor.contactNumber}</p>
            <p className="pastor-info">{pastor.message}</p>

            <div className="pastor-actions">
              <button className="edit-btn" onClick={() => setEditingPastor(pastor)}>Edit</button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(pastor.pastorId)}
                disabled={loadingId === pastor.pastorId}
              >
                {loadingId === pastor.pastorId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreatePastor refresh={fetchPastors} />

      {editingPastor && (
        <UpdatePastor
          pastor={editingPastor}
          refresh={fetchPastors}
          close={() => setEditingPastor(null)}
        />
      )}
    </div>
  );
};

export default Pastors;