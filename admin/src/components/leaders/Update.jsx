import { useState } from "react";
import { updateLeader } from "../../Features/leaders/leadersAPI";
import "./Update.css";

export default function Update({leader,onClose,onSuccess}){

const [name,setName] = useState(leader.name);
const [department,setDepartment] = useState(leader.department);
const [contactInfo,setContactInfo] = useState(leader.contactInfo);
const [role,setRole] = useState(leader.role);

const handleSubmit = async (e) => {

e.preventDefault();

try{

await updateLeader(leader.leaderId,{
name,
department,
contactInfo,
role
});

onSuccess();

}catch(err){
console.log(err);
}

};

return(

<div className="update-overlay">

<div className="update-modal">

<h3>Update Leader</h3>

<form onSubmit={handleSubmit}>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
value={department}
onChange={(e)=>setDepartment(e.target.value)}
/>

<input
value={contactInfo}
onChange={(e)=>setContactInfo(e.target.value)}
/>

<input
value={role}
onChange={(e)=>setRole(e.target.value)}
/>

<div className="update-actions">

<button type="submit">
Update
</button>

<button
type="button"
onClick={onClose}
className="cancel-btn"
>
Cancel
</button>

</div>

</form>

</div>

</div>

);
}