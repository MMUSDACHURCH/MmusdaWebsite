import { DepartmentService } from "./departments.service.js";

export const DepartmentController = {
  // Create a new department
  create: async (req, res) => {
    try {
      const { name, description, adminLeader, assistant, adminContact } = req.body;
      const department = await DepartmentService.createDepartment({
        name, description, adminLeader, assistant, adminContact
      });
      res.status(201).json({
        message: "Department created successfully",
        department
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create department" });
    }
  },

  // Get all departments
  getAll: async (req, res) => {
    try {
      const departments = await DepartmentService.getAllDepartments();
      res.status(200).json({ departments });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch departments" });
    }
  },

  // Update a department by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await DepartmentService.updateDepartment(Number(id), data);
      if (!updated) {
        return res.status(404).json({ message: `Department with ID ${id} not found` });
      }
      res.status(200).json({
        message: "Department updated successfully",
        department: updated
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update department" });
    }
  },

  // Delete a department by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await DepartmentService.deleteDepartment(Number(id));

      // Check if any row was deleted
      if (!deleted || deleted.rowCount === 0) {
        return res.status(404).json({ message: `Department with ID ${id} not found` });
      }

      res.status(200).json({ message: `Department with ID ${id} deleted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete department" });
    }
  }
};