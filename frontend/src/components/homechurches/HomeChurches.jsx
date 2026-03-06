import { useEffect, useState } from "react";
import { fetchAllHomeChurches } from "../../Features/homechurches/homechurchesAPI";
import "../homechurches/HomeChurches.css";

export default function HomeChurches() {
  const [homeChurches, setHomeChurches] = useState([]);

  const loadHomeChurches = async () => {
    const data = await fetchAllHomeChurches();
    setHomeChurches(data);
  };

  useEffect(() => {
    loadHomeChurches();
  }, []);

  return (
    <div className="homechurches-container">
      <h1 className="title">Home Churches</h1>

      <div className="quotes-section">
        <p className="quote">"For where two or three are gathered in my name, there am I among them." – Matthew 18:20</p>
        <p className="quote">"And let us consider how to stir up one another to love and good works." – Hebrews 10:24</p>
      </div>

      <div className="table-wrapper">
        <table className="homechurches-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Leader</th>
              <th>Location</th>
              <th>Contact Info</th>
            </tr>
          </thead>
          <tbody>
            {homeChurches.length > 0 ? (
              homeChurches.map((church) => (
                <tr key={church.homechurchId}>
                  <td>{church.name}</td>
                  <td>{church.leader || "-"}</td>
                  <td>{church.location || "-"}</td>
                  <td>{church.contactInfo || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No home churches found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}