import { useEffect, useState } from "react";
import { getAllLeaders, deleteLeader, getLeadersByRole } from "../../Features/leaders/leadersAPI";
import { FaTrash, FaEdit } from "react-icons/fa";
import CreateLeader from "./CreateLeader";
import Update from "./Update";
import "./Leaders.css";

export default function Leaders(){

const [leaders,setLeaders] = useState([]);
const [showCreate,setShowCreate] = useState(false);
const [showUpdate,setShowUpdate] = useState(false);
const [selectedLeader,setSelectedLeader] = useState(null);
const [searchRole,setSearchRole] = useState("");

const fetchLeaders = async () => {
try{
const data = await getAllLeaders();
setLeaders(data.leaders);
}catch(err){
console.log(err);
}
};

useEffect(()=>{
fetchLeaders();
},[]);

const handleSearch = async () => {

if(!searchRole){
fetchLeaders();
return;
}

try{
const data = await getLeadersByRole(searchRole);
setLeaders(data.leaders);
}catch(err){
console.log(err);
}

};

const handleDelete = async (id) => {

try{
await deleteLeader(id);
fetchLeaders();
}catch(err){
console.log(err);
}

};

const openUpdate = (leader) => {
setSelectedLeader(leader);
setShowUpdate(true);
};

return(

<div className="leaders-page">

<div className="leaders-header">

<h2>Leaders</h2>

<button
className="create-btn"
onClick={()=>setShowCreate(true)}
>
Create Leader
</button>

</div>

<div className="leaders-search">

<input
type="text"
placeholder="Search by role"
value={searchRole}
onChange={(e)=>setSearchRole(e.target.value)}
/>

<button onClick={handleSearch}>
Search
</button>

</div>

{showCreate && (
<CreateLeader onSuccess={()=>{
setShowCreate(false);
fetchLeaders();
}}/>
)}

{showUpdate && selectedLeader && (
<Update
leader={selectedLeader}
onClose={()=>setShowUpdate(false)}
onSuccess={()=>{
setShowUpdate(false);
fetchLeaders();
}}
/>
)}

<div className="table-container">

<table className="leaders-table">

<thead>
<tr>
<th>Name</th>
<th>Department</th>
<th>Contact</th>
<th>Role</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{leaders.map((leader)=>(
<tr key={leader.leaderId}>

<td>{leader.name}</td>
<td>{leader.department}</td>
<td>{leader.contactInfo}</td>
<td>{leader.role}</td>

<td className="actions">

<FaEdit
className="edit-icon"
onClick={()=>openUpdate(leader)}
/>

<FaTrash
className="delete-icon"
onClick={()=>handleDelete(leader.leaderId)}
/>

</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

);
}