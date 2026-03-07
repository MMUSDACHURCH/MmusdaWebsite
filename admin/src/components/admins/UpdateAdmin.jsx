import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { AdminsAPI } from "../../Features/admins/adminsAPI";
import "./Admins.css";

export default function UpdateAdmin(){

const {id} = useParams()
const navigate = useNavigate()

const [fullName,setFullName] = useState("")
const [email,setEmail] = useState("")

useEffect(()=>{
load()
},[])

const load = async ()=>{
const admins = await AdminsAPI.getAdmins()
const admin = admins.find(a=>a.adminId == id)
setFullName(admin.fullName)
setEmail(admin.email)
}

const submit = async (e)=>{
e.preventDefault()

await AdminsAPI.updateAdmin(id,{
fullName,
email
})

navigate("/admins")
}

return(
<div className="form-page">
<h2>Update Admin</h2>

<form onSubmit={submit}>

<input
type="text"
value={fullName}
onChange={(e)=>setFullName(e.target.value)}
/>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<button>Update</button>

</form>

</div>
)
}