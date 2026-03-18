import { useEffect, useState } from "react";
import { getAllPrayerRequests, deletePrayerRequest } from "../../Features/prayer/PrayerAPI";
import { FaTrash, FaDownload, FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Prayer.css";

export default function Prayer() {

const [requests,setRequests] = useState([]);
const [filtered,setFiltered] = useState([]);

const [search,setSearch] = useState("");
const [dateFilter,setDateFilter] = useState("");
const [visibilityFilter,setVisibilityFilter] = useState("all");

const [currentPage,setCurrentPage] = useState(1);
const itemsPerPage = 8;

const loadData = async()=>{
const data = await getAllPrayerRequests();
setRequests(data);
setFiltered(data);
};

useEffect(()=>{
loadData();
},[]);

useEffect(()=>{

let data = [...requests];

if(search){
data = data.filter(r =>
`${r.firstName} ${r.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
r.title.toLowerCase().includes(search.toLowerCase())
);
}

if(dateFilter){
data = data.filter(
r => new Date(r.createdAt).toISOString().slice(0,10) === dateFilter
);
}

if(visibilityFilter !== "all"){
data = data.filter(r => r.isPublic === visibilityFilter);
}

setFiltered(data);
setCurrentPage(1);

},[search,dateFilter,visibilityFilter,requests]);

const handleDelete = async(id)=>{
await deletePrayerRequest(id);
loadData();
};

const downloadPDF=(type)=>{

let data = filtered;

if(type==="public"){
data = filtered.filter(r=>r.isPublic==="yes");
}

if(type==="private"){
data = filtered.filter(r=>r.isPublic==="no");
}

const doc = new jsPDF();

autoTable(doc,{
head:[["Name","Phone","Title","Description","Public","Date"]],
body:data.map(r=>[
`${r.firstName} ${r.lastName}`,
r.phoneNumber || "",
r.title,
r.description || "",
r.isPublic,
new Date(r.createdAt).toLocaleDateString()
])
});

doc.save("prayer_requests.pdf");

};

const total = requests.length;
const publicCount = requests.filter(r=>r.isPublic==="yes").length;
const privateCount = requests.filter(r=>r.isPublic==="no").length;

const lastIndex = currentPage * itemsPerPage;
const firstIndex = lastIndex - itemsPerPage;
const currentItems = filtered.slice(firstIndex,lastIndex);
const totalPages = Math.ceil(filtered.length / itemsPerPage);

return (

<div className="prayerPage">

<h2 className="pageTitle">Prayer Requests Dashboard</h2>

<div className="stats">

<div className="card">
<h3>Total</h3>
<p>{total}</p>
</div>

<div className="card">
<h3>Public</h3>
<p>{publicCount}</p>
</div>

<div className="card">
<h3>Private</h3>
<p>{privateCount}</p>
</div>

</div>

<div className="filters">

<div className="searchBox">
<FaSearch/>
<input
type="text"
placeholder="Search name or title..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
</div>

<input
type="date"
value={dateFilter}
onChange={(e)=>setDateFilter(e.target.value)}
/>

<select
value={visibilityFilter}
onChange={(e)=>setVisibilityFilter(e.target.value)}
>
<option value="all">All</option>
<option value="yes">Public</option>
<option value="no">Private</option>
</select>

<button onClick={()=>downloadPDF("all")}>
<FaDownload/> All
</button>

<button onClick={()=>downloadPDF("public")}>
<FaDownload/> Public
</button>

<button onClick={()=>downloadPDF("private")}>
<FaDownload/> Private
</button>

</div>

<div className="tableWrapper">

<table className="prayerTable">

<thead>
<tr>
<th>Name</th>
<th>Phone</th>
<th>Title</th>
<th>Description</th>
<th>Public</th>
<th>Date</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{currentItems.map(r=>(
<tr key={r.requestId}>

<td>{r.firstName} {r.lastName}</td>

<td>{r.phoneNumber}</td>

<td>{r.title}</td>

<td className="desc">{r.description}</td>

<td>
<span className={r.isPublic==="yes" ? "badge public":"badge private"}>
{r.isPublic}
</span>
</td>

<td>{new Date(r.createdAt).toLocaleDateString()}</td>

<td>

<button
className="deleteBtn"
onClick={()=>handleDelete(r.requestId)}
>
<FaTrash/>
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

<div className="pagination">

<button
disabled={currentPage===1}
onClick={()=>setCurrentPage(p=>p-1)}
>
Prev
</button>

<span>{currentPage} / {totalPages}</span>

<button
disabled={currentPage===totalPages}
onClick={()=>setCurrentPage(p=>p+1)}
>
Next
</button>

</div>

</div>

);
}