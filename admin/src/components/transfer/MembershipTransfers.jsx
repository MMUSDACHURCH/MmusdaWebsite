import React, { useEffect, useState } from "react";
import { MembershipTransfersAPI } from "../../Features/membershipTransfers/membershipTransfersAPI";
import CreateTransfer from "./CreateTransfer";
import UpdateTransfer from "./UpdateTransfer";
import "./MembershipTransfers.css";

const MembershipTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const fetchTransfers = async () => {
    const data = await MembershipTransfersAPI.getAll();
    setTransfers(data);
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transfer request?")) {
      setLoadingId(id);
      await MembershipTransfersAPI.delete(id);
      setLoadingId(null);
      fetchTransfers();
    }
  };

  return (
    <div className="transfers-container">
      <h1>Membership Transfer Portal</h1>
      
      <div className="transfers-grid">
        {transfers.map((t) => (
          <div key={t.transferId} className="transfer-card">
            <h3>{t.fullName}</h3>
            <p className="transfer-info"><strong>From:</strong> {t.fromChurch}</p>
            <p className="transfer-info"><strong>To:</strong> {t.toChurch}</p>
            <p className="transfer-info"><strong>Conference:</strong> {t.destinationConference}</p>
            <span className={`status-badge ${t.status}`}>
              {t.status}
            </span>
            
            <div className="transfer-actions">
              <button className="edit-btn" onClick={() => setEditing(t)}>
                Edit
              </button>
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(t.transferId)}
                disabled={loadingId === t.transferId}
              >
                {loadingId === t.transferId ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateTransfer refresh={fetchTransfers} />

      {editing && (
        <UpdateTransfer 
          record={editing} 
          refresh={fetchTransfers} 
          close={() => setEditing(null)} 
        />
      )}
    </div>
  );
};

export default MembershipTransfers;