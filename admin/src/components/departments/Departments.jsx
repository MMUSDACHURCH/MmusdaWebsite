import React, { useEffect, useState } from "react";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../Features/departments/departmentsAPI";

import { FaTrash, FaEdit } from "react-icons/fa";
import "./Departments.css";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadDepartments = async () => {
    const data = await getAllDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateDepartment(editingId, { name });
      setEditingId(null);
    } else {
      await createDepartment({ name });
    }

    setName("");
    loadDepartments();
  };

  const handleEdit = (dept) => {
    setEditingId(dept._id);
    setName(dept.name);
  };

  const handleDelete = async (id) => {
    await deleteDepartment(id);
    loadDepartments();
  };

  return (
    <div className="departments-container">
      <h2 className="dept-title">Departments</h2>

      <form onSubmit={handleSubmit} className="dept-form">
        <input
          type="text"
          placeholder="Department name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">
          {editingId ? "Update Department" : "Add Department"}
        </button>
      </form>

      <ul className="dept-list">
        {departments.map((dept) => (
          <li key={dept._id} className="dept-item">
            <span>{dept.name}</span>

            <div className="dept-actions">
              <FaEdit
                className="edit-icon"
                onClick={() => handleEdit(dept)}
              />
              <FaTrash
                className="delete-icon"
                onClick={() => handleDelete(dept._id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Departments;