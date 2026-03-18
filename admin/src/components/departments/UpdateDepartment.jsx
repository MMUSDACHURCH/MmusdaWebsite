import React,{useState,useEffect} from "react";
import { DepartmentsAPI } from "../../Features/departments/departmentsAPI";
import "./UpdateDepartment.css";

const UpdateDepartment = ({department,onUpdated,onCancel})=>{

  const [formData,setFormData] = useState({
    name:"",
    description:"",
    adminLeader:"",
    assistant:"",
    adminContact:""
  });

  const [loading,setLoading] = useState(false);

  useEffect(()=>{

    if(department){
      setFormData({
        name:department.name || "",
        description:department.description || "",
        adminLeader:department.adminLeader || "",
        assistant:department.assistant || "",
        adminContact:department.adminContact || ""
      });
    }

  },[department]);

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

      const updated = await DepartmentsAPI.updateDepartment(
        department.departmentId,
        formData
      );

      onUpdated(updated);

    }finally{
      setLoading(false);
    }
  };

  return(

    <form className="department-form" onSubmit={handleSubmit}>

      <h3 className="form-title">Update Department</h3>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="adminLeader"
        value={formData.adminLeader}
        onChange={handleChange}
      />

      <input
        type="text"
        name="assistant"
        value={formData.assistant}
        onChange={handleChange}
      />

      <input
        type="text"
        name="adminContact"
        value={formData.adminContact}
        onChange={handleChange}
      />

      <div className="form-buttons">

        <button
          className={`save-btn ${loading ? "btn-loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
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

export default UpdateDepartment;