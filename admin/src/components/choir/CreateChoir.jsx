import { useState } from "react";
import { createChoir } from "../../Features/choirs/choirsAPI";
import "./CreateChoir.css";

export default function CreateChoir({ onSuccess }) {

const [form,setForm] = useState({
name:"",
leaderName:"",
description:"",
videoUrl:"",
choirPhoto:"",
membersCount:0
});

const [loading,setLoading] = useState(false);

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{
e.preventDefault();
setLoading(true);

await createChoir(form);

setForm({
name:"",
leaderName:"",
description:"",
videoUrl:"",
choirPhoto:"",
membersCount:0
});

setLoading(false);

if(onSuccess){
onSuccess();
}
};

return(

<div className="createChoir">

<h2>Create Choir</h2>

<form onSubmit={handleSubmit}>

<input
name="name"
placeholder="Choir Name"
value={form.name}
onChange={handleChange}
required
/>

<input
name="leaderName"
placeholder="Leader Name"
value={form.leaderName}
onChange={handleChange}
required
/>

<input
name="membersCount"
type="number"
placeholder="Members Count"
value={form.membersCount}
onChange={handleChange}
/>

<input
name="videoUrl"
placeholder="YouTube Video URL"
value={form.videoUrl}
onChange={handleChange}
/>

<input
name="choirPhoto"
placeholder="Choir Photo URL"
value={form.choirPhoto}
onChange={handleChange}
/>

<textarea
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
/>

<button type="submit" disabled={loading}>
{loading ? "Creating..." : "Create Choir"}
</button>

</form>

</div>

);
}