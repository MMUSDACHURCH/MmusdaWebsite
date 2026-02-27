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
      setFormData({ name: "", contactNumber: "", message: "" });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="suggestions-container">
      <form className="suggestions-form" onSubmit={handleSubmit}>
        <h2>Submit a Suggestion</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
        />
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Suggestion"
          required
        />
        <button type="submit">Submit</button>
        {message && <p className="response-message">{message}</p>}
      </form>
    </div>
  );
};

export default Suggestions;