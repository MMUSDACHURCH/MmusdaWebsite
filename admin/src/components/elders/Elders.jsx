import React, { useEffect, useState } from "react";
import { getAllElders, deleteElder } from "../../Features/elders/eldersAPI";
import CreateElder from "./CreateElder";
import UpdateElder from "./UpdateElder";
import "./Elders.css";

const Elders = () => {
  const [elders, setElders] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchElders = async () => {
    const data = await getAllElders();
    setElders(data);
  };

  useEffect(() => {
    fetchElders();
  }, []);

  return (
    <div className="elders-container">
      <h1>Elders</h1>

      <div className="elders-grid">
        {elders.map((elder) => (
          <div key={elder.elderId} className="elder-card">
            {elder.image && (
              <img
                src={elder.image}
                alt={elder.name}
                className="elder-image-circle"
              />
            )}

            <h3>{elder.name}</h3>
            <p>{elder.role}</p>
            <p>{elder.contactNumber}</p>
            <p>{elder.message || "Message from elder"}</p>

            <div className="elder-actions">
              <button
                className="edit-btn"
                onClick={() => setEditing(elder)}
              >
                ✏️
              </button>

              <button
                className="delete-btn"
                onClick={async () => {
                  await deleteElder(elder.elderId);
                  fetchElders();
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateElder refresh={fetchElders} />

      {editing && (
        <UpdateElder
          elder={editing}
          refresh={fetchElders}
          close={() => setEditing(null)}
        />
      )}
    </div>
  );
};

export default Elders;