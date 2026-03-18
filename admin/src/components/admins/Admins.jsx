import { useEffect, useState } from "react";
import { AdminsAPI } from "../../Features/admins/adminsAPI";
import "./Admins.css";

export default function Admins() {
  const [admins, setAdmins] = useState([]);

  const loadAdmins = async () => {
    const data = await AdminsAPI.getAdmins();
    setAdmins(data);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <div className="admins-page">
      <div className="admins-header">
        <h2>Admins</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => (
            <tr key={admin.adminId}>
              <td>{admin.fullName}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}