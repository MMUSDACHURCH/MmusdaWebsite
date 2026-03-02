import { useEffect, useState } from "react";
import { fetchAllEvents } from "../../Features/events/eventsAPI.js";
//import "./Events.css"

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllEvents();
      setEvents(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) return <p className="loading-text">Lgit push --force-with-leaseoading events...</p>;

  return (
    <div className="events-container">
      <header className="events-header">
        <h1 className="title-motion">Church Events</h1>

        <input
          type="text"
          placeholder="Search events by title..."
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <p className="verse">
          “Let us consider one another to stir up love and good works,
          not forsaking the assembling of ourselves together.”
          — Hebrews 10:24–25
        </p>

        <p className="quote">“Great things happen when God’s people gather.”</p>
        <p className="quote">“Where two or three gather in My name, I am there among them.” — Matthew 18:20</p>

        <p className="intro">
          Every event strengthens fellowship, builds unity, and inspires spiritual growth.
          As a family in Christ, we celebrate, worship, and serve together.
        </p>

        <div className="section-line"></div>
      </header>

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div key={event.eventId} className="event-card">
            <div className="event-image-wrapper">
              <img
                src={event.photo || "https://via.placeholder.com/400x250?text=Church+Event"}
                alt={event.title}
                className="event-image"
              />
            </div>

            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-date">Date: {new Date(event.eventDate).toDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <p className="no-results">No events match your search.</p>
      )}

      <footer className="events-footer">
        <p>“Serve the Lord with gladness; come before His presence with singing.” — Psalm 100:2</p>
        <p>“To everything there is a season, a time for every purpose under heaven.” — Ecclesiastes 3:1</p>
      </footer>
    </div>
  );
};

export default Events;