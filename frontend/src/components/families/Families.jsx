import React, { useEffect, useState } from "react";
import { fetchFamilies } from "../../Features/families/familiesAPI.js";
import "./Families.css";

const Families = () => {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFamilies = async () => {
      const data = await fetchFamilies();
      setFamilies(data);
      setLoading(false);
    };
    getFamilies();
  }, []);

  if (loading) return <div className="families-loading">Loading families...</div>;
  if (!families.length) return <div className="families-empty">No families found.</div>;

  return (
    <div className="families-container">
      <h2 className="families-title">MMUSDA FAMILIES</h2>
      <div className="families-grid">
        {families.map((family, index) => (
          <div
            key={family.familyId}
            className={`family-card ${index % 2 === 0 ? "image-left" : "image-right"}`}
          >
            {family.photoUrl && (
              <div className="family-photo-wrapper">
                <img
                  src={family.photoUrl}
                  alt={family.familyName}
                  className="family-photo"
                />
              </div>
            )}
            <div className="family-info">
              <h3 className="family-name">{family.familyName}</h3>
              <p className="family-detail"><strong>Head:</strong> {family.headOfFamily}</p>
              {family.contactInfo && <p className="family-detail"><strong>Contact:</strong> {family.contactInfo}</p>}
              {family.leaderContact && <p className="family-detail"><strong>Leader Contact:</strong> {family.leaderContact}</p>}
              {family.description && <p className="family-description">{family.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Families;