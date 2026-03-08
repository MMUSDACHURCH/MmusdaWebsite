import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { getAllHomeChurches, deleteHomeChurch } from "../../Features/homechurches/homechurchesAPI";
import CreateHomeChurch from "./CreateHomeChurch";
import UpdateHomeChurch from "./UpdateHomeChurch";
import "./HomeChurches.css";

export default function HomeChurches(){

const [churches,setChurches] = useState([]);
const [showCreate,setShowCreate] = useState(false);
const [showUpdate,setShowUpdate] = useState(false);
const [selectedChurch,setSelectedChurch] = useState(null);
const [loading,setLoading] = useState(true);

const fetchChurches = async () => {
try{
setLoading(true);
const data = await getAllHomeChurches();
setChurches(data);
}catch(err){ console.log(err); }
setLoading(false);
};

useEffect(()=>{ fetchChurches(); },[]);

const handleDelete = async (id) => {
if(!window.confirm("Delete this Home Church?")) return;
try{
await deleteHomeChurch(id);
fetchChurches();
}catch(err){ console.log(err); }
};

const openUpdate = (church) => {
setSelectedChurch(church);
setShowUpdate(true);
};

return(
<div className="homechurch-page">

<div className="homechurch-header">
<h2>Home Churches</h2>
<button className="create-btn" onClick={()=>setShowCreate(!showCreate)}>
{showCreate ? "Close" : "Create Home Church"}
</button>
</div>

{showCreate && (
<CreateHomeChurch onSuccess={()=>{
setShowCreate(false);
fetchChurches();
}}/>
)}

{showUpdate && selectedChurch && (
<UpdateHomeChurch
church={selectedChurch}
onClose={()=>setShowUpdate(false)}
onSuccess={()=>{
setShowUpdate(false);
fetchChurches();
}}
/>
)}

<div className="table-container">
{loading ? <p className="loading-text">Loading Home Churches...</p> :
<table className="homechurch-table">
<thead>
<tr>
<th>Name</th>
<th>Leader</th>
<th>Contact</th>
<th>Location</th>
<th>Description</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{churches.map(church=>(
<tr key={church.homechurchId}>
<td>{church.name}</td>
<td>{church.leaderName}</td>
<td>{church.leaderContact}</td>
<td>{church.location}</td>
<td>{church.description}</td>
<td className="actions">
<FaEdit className="edit-icon" onClick={()=>openUpdate(church)}/>
<FaTrash className="delete-icon" onClick={()=>handleDelete(church.homechurchId)}/>
</td>
</tr>
))}
</tbody>
</table>}
</div>

</div>
);
}