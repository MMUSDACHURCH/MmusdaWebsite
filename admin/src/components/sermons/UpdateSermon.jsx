import React,{useState} from "react"
import { updateSermon } from "../../Features/sermons/sermonsAPI"
import "./UpdateSermon.css"

const UpdateSermon=({sermon,onClose,onUpdated})=>{

const [title,setTitle]=useState(sermon.title)
const [sermonDate,setDate]=useState(sermon.sermonDate)
const [videoUrl,setVideo]=useState(sermon.videoUrl)
const [description,setDesc]=useState(sermon.description)

const handleSubmit=async e=>{
e.preventDefault()

await updateSermon(sermon.sermonId,{
title,
sermonDate,
videoUrl,
description
})

onUpdated()
onClose()
}

return(

<div className="modal-overlay">

<form className="sermon-form" onSubmit={handleSubmit}>

<h3>Update Sermon</h3>

<input
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
value={videoUrl}
onChange={e=>setVideo(e.target.value)}
/>

<textarea
value={description}
onChange={e=>setDesc(e.target.value)}
/>

<div className="form-buttons">

<button type="submit">Update</button>
<button type="button" onClick={onClose}>Cancel</button>

</div>

</form>

</div>

)

}

export default UpdateSermon