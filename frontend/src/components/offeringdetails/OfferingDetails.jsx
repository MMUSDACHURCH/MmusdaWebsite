import React, { useEffect, useState } from "react";
import { getAllOfferingDetails } from "../../Features/offeringdetails/offeringDetailsAPI";
import "./OfferingDetails.css";

const OfferingDetails = () => {
  const [offerings, setOfferings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const data = await getAllOfferingDetails();
        setOfferings(data);
      } catch (err) {
        setError("Failed to fetch offerings.");
        console.error(err);
      }
    };
    fetchOfferings();
  }, []);

  return (
    <div className="offering-details-box">
      <h3>Offering Details</h3>
      {error && <p className="error">{error}</p>}
      {offerings.length === 0 ? (
        <p>No offerings found.</p>
      ) : (
        <ul>
          {offerings.map((offering) => (
            <li key={offering.id}>
              <strong>{offering.name}</strong> - {offering.phoneNumber}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OfferingDetails;