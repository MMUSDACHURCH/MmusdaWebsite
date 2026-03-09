import React, { useEffect, useState } from "react";
import { announcementAPI } from "../../Features/announcements/announcementsAPI";
import "./Announcements.css";

const Announcements = () => {

  const [announcements, setAnnouncements] = useState([]);
  const [idFilter, setIdFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementAPI.getAll();
      setAnnouncements(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterById = async () => {
    if (!idFilter) return fetchAllAnnouncements();
    try {
      setLoading(true);
      const data = await announcementAPI.getById(idFilter);
      setAnnouncements(data ? [data] : []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByDate = async () => {
    if (!dateFilter) return fetchAllAnnouncements();
    try {
      setLoading(true);
      const data = await announcementAPI.getFromDate(dateFilter);
      setAnnouncements(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAnnouncements();
  }, []);

  return (
    <div className="announcements-container">

      <h1 className="page-title">MMUSDA CHURCH ANNOUNCEMENTS</h1>

      <div className="filters">

        <div className="filter-group">
          <label>Filter by ID</label>
          <input
            type="number"
            value={idFilter}
            onChange={(e) => setIdFilter(e.target.value)}
          />
          <button onClick={handleFilterById}>Apply</button>
        </div>

        <div className="filter-group">
          <label>Filter from Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <button onClick={handleFilterByDate}>Apply</button>
        </div>

      </div>

      {loading && <p className="status-text">Loading announcements...</p>}
      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">

        {announcements.length === 0 && !loading ? (
          <p className="status-text">No announcements found.</p>
        ) : (

          <table className="announcements-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {announcements.map((announcement) => (
                <tr key={announcement.announcementId}>
                  <td>{announcement.announcementId}</td>
                  <td className="title-cell">{announcement.title}</td>
                  <td>{announcement.content}</td>
                  <td>{new Date(announcement.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default Announcements;