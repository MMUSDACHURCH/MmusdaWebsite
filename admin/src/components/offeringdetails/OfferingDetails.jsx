import { useEffect, useState } from "react";
import { getAllOfferingDetails, updateOfferingDetails } from "../../Features/offeringDetails/offeringDetailsAPI";
import { APIDomain } from "../../utils/APIDomain";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import "./OfferingDetails.css";

export default function OfferingDetails() {
  const [details, setDetails] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", phoneNumber: "" });
  const [openCreate, setOpenCreate] = useState(false);
  const [newData, setNewData] = useState({ name: "", phoneNumber: "" });

  const loadDetails = async () => {
    const data = await getAllOfferingDetails();
    setDetails(data);
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ name: item.name, phoneNumber: item.phoneNumber });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({ name: "", phoneNumber: "" });
  };

  const handleSave = async (id) => {
    await updateOfferingDetails(id, editData);
    setEditingId(null);
    loadDetails();
  };

  const handleDelete = async (id) => {
    await fetch(`${APIDomain}/api/offeringsdetails/${id}`, {
      method: "DELETE",
    });
    loadDetails();
  };

  const handleCreate = async () => {
    await fetch(`${APIDomain}/api/offeringsdetails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    setNewData({ name: "", phoneNumber: "" });
    setOpenCreate(false);
    loadDetails();
  };

  return (
    <div className="offering-details-page">
      <div className="header">
        <h2>Offering Details</h2>
        <button className="create-btn" onClick={() => setOpenCreate(true)}>
          <AiOutlinePlus /> Add
        </button>
      </div>

      <table className="details-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.length === 0 && (
            <tr>
              <td colSpan="3" className="no-data">No offering details found</td>
            </tr>
          )}
          {details.map((item) => (
            <tr key={item.id}>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editData.phoneNumber}
                    onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                  />
                ) : (
                  item.phoneNumber
                )}
              </td>
              <td className="actions">
                {editingId === item.id ? (
                  <>
                    <AiOutlineSave className="icon save" onClick={() => handleSave(item.id)} />
                    <AiOutlineClose className="icon cancel" onClick={handleCancel} />
                  </>
                ) : (
                  <>
                    <AiOutlineEdit className="icon edit" onClick={() => handleEdit(item)} />
                    <AiOutlineDelete className="icon delete" onClick={() => handleDelete(item.id)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openCreate && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create Offering Detail</h3>
            <label>Name</label>
            <input
              type="text"
              value={newData.name}
              onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            />
            <label>Phone Number</label>
            <input
              type="text"
              value={newData.phoneNumber}
              onChange={(e) => setNewData({ ...newData, phoneNumber: e.target.value })}
            />
            <div className="modal-actions">
              <button className="save-btn" onClick={handleCreate}><AiOutlineSave /> Save</button>
              <button className="cancel-btn" onClick={() => setOpenCreate(false)}><AiOutlineClose /> Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}