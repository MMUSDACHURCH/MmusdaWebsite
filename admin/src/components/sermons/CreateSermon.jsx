import React, { useState } from "react";
import { createSermon } from "../../Features/sermons/sermonsAPI";
import "./CreateSermon.css";

const CreateSermon = ({ onClose, onCreated }) => {

const [title,setTitle]=useState("");
const [sermonDate,setDate]=useState("");
const [videoUrl,setVideo]=useState("");
const [description,setDesc]=useState("");

const handleSubmit=async e=>{
e.preventDefault()

await createSermon({
title,
sermonDate,
videoUrl,
description
})

onCreated()
onClose()
}

return(

<div className="modal-overlay">

<form className="sermon-form" onSubmit={handleSubmit}>

<h3>Create Sermon</h3>

<input
type="text"
placeholder="Title"
value={title}
onChange={e=>setTitle(e.target.value)}
required
/>

<input
type="date"
value={sermonDate}
onChange={e=>setDate(e.target.value)}
required
/>

<input
type="text"
placeholder="Youtube Video URL"
value={videoUrl}
onChange={e=>setVideo(e.target.value)}
/>

<textarea
placeholder="Description"
value={description}
onChange={e=>setDesc(e.target.value)}
/>

<div className="form-buttons">

<button type="submit">Create</button>
<button type="button" onClick={onClose}>Cancel</button>

</div>

</form>

</div>

)

}

export default CreateSermon