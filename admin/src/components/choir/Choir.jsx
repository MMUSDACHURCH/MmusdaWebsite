import { useEffect, useState } from "react";
import { getAllChoirs } from "../../Features/choirs/choirsAPI";
import { FaEdit, FaYoutube } from "react-icons/fa";
import CreateChoir from "./CreateChoir";
import UpdateChoir from "./UpdateChoir";
import "./Choir.css";

export default function Choir() {

const [choirs,setChoirs] = useState([]);
const [selectedChoir,setSelectedChoir] = useState(null);
const [loading,setLoading] = useState(true);

const loadChoirs = async () => {
setLoading(true);
const data = await getAllChoirs();
setChoirs(data);
setLoading(false);
};

useEffect(()=>{
loadChoirs();
},[]);

return(

<div className="choirPage">

<h1 className="pageTitle">Choirs Management</h1>

<CreateChoir onSuccess={loadChoirs} />

{selectedChoir && (
<UpdateChoir
choir={selectedChoir}
onSuccess={()=>{
setSelectedChoir(null);
loadChoirs();
}}
/>
)}

<div className="choirList">

{loading && <p className="loading">Loading choirs...</p>}

{!loading && choirs.length === 0 && (
<p className="empty">No choirs available</p>
)}

{choirs.map((choir)=>(
<div className="choirCard" key={choir.choirId}>

<img
src={choir.choirPhoto || "https://via.placeholder.com/400x250"}
alt={choir.name}
/>

<div className="cardContent">

<h3>{choir.name}</h3>

<p className="leader">Leader: {choir.leaderName}</p>

<p className="members">
Members: {choir.membersCount}
</p>

<p className="desc">
{choir.description}
</p>

<div className="actions">

{choir.videoUrl && (
<a
href={choir.videoUrl}
target="_blank"
rel="noreferrer"
className="videoBtn"
>
<FaYoutube/>
</a>
)}

<button
className="editBtn"
onClick={()=>setSelectedChoir(choir)}
>
<FaEdit/>
</button>

</div>

</div>

</div>
))}

</div>

</div>

);
}