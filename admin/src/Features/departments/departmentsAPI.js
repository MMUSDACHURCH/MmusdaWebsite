import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const DEPARTMENTS_URL = `${APIDomain}/api/department`;

export const DepartmentsAPI = {
  // Fetch all departments
  getAllDepartments: async () => {
    try {
      const response = await axios.get(DEPARTMENTS_URL);
      return response.data.departments;
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      throw error;
    }
  },

  // Create a new department
  createDepartment: async (departmentData) => {
    try {
      const response = await axios.post(DEPARTMENTS_URL, departmentData);
      return response.data.department;
    } catch (error) {
      console.error("Failed to create department:", error);
      throw error;
    }
  },

  // Delete a department by ID
  deleteDepartment: async (id) => {
    try {
      const response = await axios.delete(`${DEPARTMENTS_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete department with ID ${id}:`, error);
      throw error;
    }
  },
  updateDepartment: async (id, departmentData) => {
    const response = await axios.put(`${DEPARTMENTS_URL}/${id}`, departmentData);
    return response.data.department;
  },
};