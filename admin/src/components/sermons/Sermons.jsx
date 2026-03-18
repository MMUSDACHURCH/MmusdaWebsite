import React, { useEffect, useState } from "react";
import { fetchSermons, deleteSermon } from "../../Features/sermons/sermonsAPI";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import CreateSermon from "./CreateSermon";
import UpdateSermon from "./UpdateSermon";
import "./Sermons.css";

const Sermons = () => {
  const [sermons, setSermons] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editingSermon, setEditingSermon] = useState(null);

  const loadSermons = async () => {
    const data = await fetchSermons();
    setSermons(data);
  };

  useEffect(() => {
    loadSermons();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this sermon?")) {
      await deleteSermon(id);
      loadSermons();
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("youtube.com/embed")) {
      return url;
    }

    return "";
  };

  return (
    <div className="sermons-container">

      <div className="sermons-header">
        <h2>Sermons Management</h2>

        <button
          className="create-btn"
          onClick={() => {
            setShowCreate(true);
            setEditingSermon(null);
          }}
        >
          <FaPlus /> Create Sermon
        </button>
      </div>

      {showCreate && (
        <CreateSermon
          onClose={() => setShowCreate(false)}
          onCreated={loadSermons}
        />
      )}

      {editingSermon && (
        <UpdateSermon
          sermon={editingSermon}
          onClose={() => setEditingSermon(null)}
          onUpdated={loadSermons}
        />
      )}

      <div className="sermons-grid">

        {sermons.map((sermon) => (
          <div key={sermon.sermonId} className="sermon-card">

            <div className="video-wrapper">
              <iframe
                src={getEmbedUrl(sermon.videoUrl)}
                title={sermon.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="sermon-info">
              <h3>{sermon.title}</h3>
              <p>{sermon.description}</p>
              <span>{sermon.sermonDate}</span>
            </div>

            <div className="sermon-actions">
              <FaEdit
                className="edit-icon"
                onClick={() => {
                  setEditingSermon(sermon);
                  setShowCreate(false);
                }}
              />

              <FaTrash
                className="delete-icon"
                onClick={() => handleDelete(sermon.sermonId)}
              />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Sermons;