import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from "./AddDeveloper.module.css"
import { devedit } from '../features/projectSlice';
const Editdeveloper = (props) => {
    
    const dispatch=useDispatch();
    const [name,setname]=useState(props.name)
    const [email,setemail]=useState(props.email)
    const [role,setrole]=useState(props.role)
    const project_id=props.pid;
    const Dev_id=props.did;
    function handleedit(e){
        e.preventDefault()
        dispatch(devedit({name,email,role,project_id,Dev_id}))
    }
  return (
     <div className={styles.main}>
          <h2>DEVELOPER DETAILS (ID : {props.did})</h2>
          <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setname(e.target.value)}></input>
          <input type="email" placeholder='Enter Email'value={email} onChange={(e)=>setemail(e.target.value)} required></input>
          <input type="text" placeholder='ROLE' value={role} onChange={(e)=>setrole(e.target.value)}></input>
          <button className={styles.addtn} onClick={handleedit}> EDIT Developer DETAILS</button>
        
    
        </div>
  )
}

export default Editdeveloper
