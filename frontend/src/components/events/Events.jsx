import { useEffect, useState } from "react";
import {
  fetchAllEvents,
  fetchEventsByTitle,
  fetchEventById,
} from "../../Features/events/eventsAPI";
import "./events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllEvents();
  }, []);

  const loadAllEvents = async () => {
    setLoading(true);
    const data = await fetchAllEvents();
    setEvents(data);
    setLoading(false);
  };

  const handleSearchByTitle = async () => {
    if (!title.trim()) {
      loadAllEvents();
      return;
    }
    setLoading(true);
    const data = await fetchEventsByTitle(title);
    setEvents(data);
    setLoading(false);
  };

  const handleSearchById = async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      const data = await fetchEventById(eventId);
      setEvents([data]);
    } catch {
      setEvents([]);
    }
    setLoading(false);
  };

  return (
    <div className="events-container">
      <h2 className="events-title">Church Events</h2>

      <div className="events-search">
        <input
          type="text"
          placeholder="Search by title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSearchByTitle}>Search Title</button>
      </div>

      <div className="events-search">
        <input
          type="number"
          placeholder="Search by ID..."
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        />
        <button onClick={handleSearchById}>Search ID</button>
        <button onClick={loadAllEvents}>Reset</button>
      </div>

      {loading ? (
        <p className="loading">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="loading">No events found</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.eventId}>
              <div className="event-image-container">
                <img src={event.photoUrl} alt={event.title} />
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <span>{event.eventDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;