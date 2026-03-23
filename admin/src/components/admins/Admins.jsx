import { useEffect, useState } from "react";
import { AdminsAPI } from "../../Features/admins/adminsAPI";
import CreateAdmin from "./CreateAdmin";
import UpdateAdmin from "./UpdateAdmin";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Icons
import "./Admins.css";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const loadAdmins = async () => {
    const data = await AdminsAPI.getAdmins();
    setAdmins(data);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      await AdminsAPI.deleteAdmin(id);
      loadAdmins();
    }
  };

  return (
    <div className="admins-page">
      <div className="admins-header">
        <h2>Admins</h2>
        <CreateAdmin reloadAdmins={loadAdmins} />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr key={admin.adminId}>
                <td>{admin.fullName}</td>
                <td>{admin.email}</td>
                <td className="actions">
                  <FiEdit
                    className="icon edit-icon"
                    title="Edit Admin"
                    onClick={() => setEditingAdmin(admin)}
                  />
                  <FiTrash2
                    className="icon delete-icon"
                    title="Delete Admin"
                    onClick={() => handleDelete(admin.adminId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingAdmin && (
        <UpdateAdmin
          admin={editingAdmin}
          onClose={() => setEditingAdmin(null)}
          reloadAdmins={loadAdmins}
        />
      )}
    </div>
  );
}