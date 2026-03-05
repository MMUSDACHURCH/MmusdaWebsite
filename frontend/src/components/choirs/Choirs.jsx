import React, { useEffect, useState } from "react";
import { fetchChoirs } from "../../Features/choirs/choirsAPI.js";
import "./Choirs.css";

const Choirs = () => {
  const [choirs, setChoirs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChoirs = async () => {
      const data = await fetchChoirs();
      setChoirs(data);
      setLoading(false);
    };
    getChoirs();
  }, []);

  if (loading) {
    return <div className="choirs-loading">Loading choirs...</div>;
  }

  if (!choirs.length) {
    return <div className="choirs-empty">No choirs found.</div>;
  }

  return (
    <div className="choirs-container">
      <h2 className="choirs-title">Our Choirs</h2>
      <div className="choirs-grid">
        {choirs.map((choir) => (
          <div key={choir.choirId} className="choir-card">
            <h3 className="choir-name">{choir.name}</h3>
            {choir.leader && <p className="choir-detail"><strong>Leader:</strong> {choir.leader}</p>}
            {choir.members && <p className="choir-detail"><strong>Members:</strong> {choir.members}</p>}
            {choir.description && <p className="choir-detail"><strong>Description:</strong> {choir.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choirs;