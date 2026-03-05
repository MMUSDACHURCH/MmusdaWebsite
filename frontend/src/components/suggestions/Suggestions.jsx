import React, { useState } from "react";
import { createSuggestion } from "../../Features/suggestions/suggestionsAPI";
import "./Suggestions.css";

const Suggestions = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    message: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSuggestion(formData);
      setMessage("Suggestion submitted successfully!");
      setFormData({
        name: "",
        contactNumber: "",
        message: ""
      });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="suggestions-page">

      <div className="suggestions-container">

        <form className="suggestions-form" onSubmit={handleSubmit}>

          <h2 className="suggestions-title">
            Submit a Suggestion
          </h2>

          <p className="optional-note">
            Name and Contact Number are optional. You may submit your suggestion anonymously.
          </p>

          <div className="form-group">
            <label>Your Name (Optional)</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name (optional)"
            />
          </div>

          <div className="form-group">
            <label>Contact Number (Optional)</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter your contact number (optional)"
            />
          </div>

          <div className="form-group">
            <label>Your Suggestion</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your suggestion here..."
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Suggestion
          </button>

          {message && (
            <p className="response-message">
              {message}
            </p>
          )}

        </form>

      </div>

    </div>
  );
};

export default Suggestions;