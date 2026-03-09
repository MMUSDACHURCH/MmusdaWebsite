import { useState, useEffect } from "react";
import { updateChoir, deleteChoir } from "../../Features/choirs/choirsAPI";
import "./UpdateChoir.css";

export default function UpdateChoir({ choir, onSuccess }) {

const [form,setForm] = useState({
name:"",
leaderName:"",
membersCount:0,
videoUrl:"",
choirPhoto:"",
description:""
});

const [updating,setUpdating] = useState(false);
const [deleting,setDeleting] = useState(false);

useEffect(()=>{
if(choir){
setForm({
name:choir.name || "",
leaderName:choir.leaderName || "",
membersCount:choir.membersCount || 0,
videoUrl:choir.videoUrl || "",
choirPhoto:choir.choirPhoto || "",
description:choir.description || ""
});
}
},[choir]);

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleUpdate=async(e)=>{
e.preventDefault();
setUpdating(true);

const payload = {
...form,
membersCount:Number(form.membersCount)
};

await updateChoir(choir.choirId,payload);

setUpdating(false);

if(onSuccess){
onSuccess();
}
};

const handleDelete=async()=>{
setDeleting(true);

await deleteChoir(choir.choirId);

setDeleting(false);

if(onSuccess){
onSuccess();
}
};

if(!choir) return null;

return(

<div className="updateChoir">

<h2>Update Choir</h2>

<form onSubmit={handleUpdate}>

<input
name="name"
value={form.name}
onChange={handleChange}
required
/>

<input
name="leaderName"
value={form.leaderName}
onChange={handleChange}
required
/>

<input
name="membersCount"
type="number"
value={form.membersCount}
onChange={handleChange}
/>

<input
name="videoUrl"
value={form.videoUrl}
onChange={handleChange}
/>

<input
name="choirPhoto"
value={form.choirPhoto}
onChange={handleChange}
/>

<textarea
name="description"
value={form.description}
onChange={handleChange}
/>

<div className="buttons">

<button type="submit" disabled={updating}>
{updating ? "Updating..." : "Update"}
</button>

<button
type="button"
className="deleteBtn"
onClick={handleDelete}
disabled={deleting}
>
{deleting ? "Deleting..." : "Delete"}
</button>

</div>

</form>

</div>

);
}