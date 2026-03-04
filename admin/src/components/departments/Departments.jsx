import React, { useEffect, useState } from "react";
import { DepartmentsAPI } from "../../Features/departments/departmentsAPI";
import CreateDepartment from "./CreateDepartment.jsx";
import "./Departments.css";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    const data = await DepartmentsAPI.getAllDepartments();
    setDepartments(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;

    await DepartmentsAPI.deleteDepartment(id);
    setDepartments(departments.filter((d) => d.departmentId !== id));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="departments-container">
      <div className="departments-header">
        <h2 className="departments-title">Departments</h2>

        <button
          className="create-btn"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? "Close" : "Create Department"}
        </button>
      </div>

      {showCreate && (
        <CreateDepartment
          onCreated={(newDept) => {
            setDepartments([newDept, ...departments]);
            setShowCreate(false);
          }}
        />
      )}

      {loading ? (
        <p className="loading-text">Loading departments...</p>
      ) : departments.length === 0 ? (
        <p className="empty-text">No departments found.</p>
      ) : (
        <table className="departments-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Admin Leader</th>
              <th>Assistant</th>
              <th>Admin Contact</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept) => (
              <tr key={dept.departmentId} className="departments-row">
                <td>{dept.name}</td>
                <td>{dept.adminLeader}</td>
                <td>{dept.assistant}</td>
                <td>{dept.adminContact}</td>
                <td className="text-center">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(dept.departmentId)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Departments;