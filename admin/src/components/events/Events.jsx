import React, { useEffect, useState } from "react";
import { EventsAPI } from "../../Features/events/eventsAPI";
import CreateEvent from "./CreateEvent";
import UpdateEvent from "./UpdateEvent";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    const data = await EventsAPI.getAllEvents();
    setEvents(data);
    setLoading(false);
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this event?")) return;
    await EventsAPI.deleteEvent(id);
    setEvents(events.filter(e => e.eventId !== id));
  };

  const handleCreated = newEvent => {
    setEvents([newEvent, ...events]);
    setShowCreate(false);
  };

  const handleUpdated = updatedEvent => {
    setEvents(events.map(e => (e.eventId === updatedEvent.eventId ? updatedEvent : e)));
    setEditingEvent(null);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <div className="events-header">
        <h2>Events</h2>
        <button onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? "Close" : "Create Event"}
        </button>
      </div>

      {showCreate && <CreateEvent onCreated={handleCreated} />}
      {editingEvent && <UpdateEvent eventData={editingEvent} onUpdated={handleUpdated} />}

      {loading ? (
        <p className="loading-text">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="loading-text">No events found</p>
      ) : (
        <div className="events-list">
          {events.map(event => (
            <div key={event.eventId} className="event-card">
              {event.photo && <img src={event.photo} alt="" className="event-img" />}
              <h3>{event.title}</h3>
              <p className="event-date">{event.eventDate}</p>
              <p>{event.description}</p>
              <div className="event-actions">
                <FaEdit className="icon edit-icon" onClick={() => setEditingEvent(event)} />
                <FaTrash className="icon delete-icon" onClick={() => handleDelete(event.eventId)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;