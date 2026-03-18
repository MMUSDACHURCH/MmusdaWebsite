import React, { useState } from "react";
import { DepartmentsAPI } from "../../Features/departments/departmentsAPI";
import "./CreateDepartment.css";

const CreateDepartment = ({ onCreated, onCancel }) => {

  const [formData,setFormData] = useState({
    name:"",
    description:"",
    adminLeader:"",
    assistant:"",
    adminContact:""
  });

  const [loading,setLoading] = useState(false);

  const handleChange = (e)=>{
    const {name,value} = e.target;

    setFormData(prev=>({
      ...prev,
      [name]:value
    }));
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{

      const newDepartment = await DepartmentsAPI.createDepartment(formData);

      onCreated(newDepartment);

      setFormData({
        name:"",
        description:"",
        adminLeader:"",
        assistant:"",
        adminContact:""
      });

    }finally{
      setLoading(false);
    }
  };

  return(

    <form className="department-form" onSubmit={handleSubmit}>

      <h3 className="form-title">Create Department</h3>

      <input
        type="text"
        name="name"
        placeholder="Department Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Department Description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="adminLeader"
        placeholder="Admin Leader"
        value={formData.adminLeader}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="assistant"
        placeholder="Assistant"
        value={formData.assistant}
        onChange={handleChange}
      />

      <input
        type="text"
        name="adminContact"
        placeholder="Admin Contact"
        value={formData.adminContact}
        onChange={handleChange}
      />

      <div className="form-buttons">

        <button
          className={`save-btn ${loading ? "btn-loading" : ""}`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>

      </div>

    </form>

  );
};

export default CreateDepartment;