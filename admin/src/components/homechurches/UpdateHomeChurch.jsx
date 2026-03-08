import { useState } from "react";
import { updateHomeChurch } from "../../Features/homechurches/homechurchesAPI";
import "./UpdateHomeChurch.css";

export default function UpdateHomeChurch({church,onClose,onSuccess}){

const [name,setName] = useState(church.name);
const [leaderName,setLeaderName] = useState(church.leaderName);
const [leaderContact,setLeaderContact] = useState(church.leaderContact);
const [location,setLocation] = useState(church.location);
const [description,setDescription] = useState(church.description);
const [loading,setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
try{
await updateHomeChurch(church.homechurchId,{name,leaderName,leaderContact,location,description});
onSuccess();
}catch(err){ console.log(err); }
setLoading(false);
};

return(
<div className="update-overlay">
<div className="update-modal">
<h3>Update Home Church</h3>
<form onSubmit={handleSubmit}>
<input value={name} onChange={e=>setName(e.target.value)} required/>
<input value={leaderName} onChange={e=>setLeaderName(e.target.value)} />
<input value={leaderContact} onChange={e=>setLeaderContact(e.target.value)} />
<input value={location} onChange={e=>setLocation(e.target.value)} />
<textarea value={description} onChange={e=>setDescription(e.target.value)} />
<div className="update-actions">
<button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
<button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
</div>
</form>
</div>
</div>
);
}