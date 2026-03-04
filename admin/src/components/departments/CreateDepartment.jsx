import React, { useState } from "react";
import { DepartmentsAPI } from "../../Features/departments/departmentsAPI";
import "./CreateDepartment.css";

const CreateDepartment = ({ onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    adminLeader: "",
    assistant: "",
    adminContact: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newDept = await DepartmentsAPI.createDepartment(formData);
      onCreated(newDept);
      setFormData({
        name: "",
        description: "",
        adminLeader: "",
        assistant: "",
        adminContact: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          className="form-input"
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-group">
        <label className="form-label">Admin Leader</label>
        <input
          className="form-input"
          type="text"
          name="adminLeader"
          required
          value={formData.adminLeader}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Assistant</label>
        <input
          className="form-input"
          type="text"
          name="assistant"
          value={formData.assistant}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Admin Contact</label>
        <input
          className="form-input"
          type="text"
          name="adminContact"
          value={formData.adminContact}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? "Creating..." : "Create Department"}
      </button>
    </form>
  );
};

export default CreateDepartment;