import React, { useState } from 'react'
import styles from "./AddDeveloper.module.css"
import { useDispatch } from 'react-redux'
import { adddev } from '../features/projectSlice';
const AddDeveloper = ({id}) => {
    const dispatch=useDispatch();
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [role,setrole]=useState("")
   
    function handleadd(){
       
        dispatch(adddev({name,email,role,id}))
    }
  return (
    <div className={styles.main}>
      <h2>DEVELOPER DETAILS</h2>
      <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setname(e.target.value)}></input>
      <input type="text" placeholder='Enter Email'value={email} onChange={(e)=>setemail(e.target.value)} ></input>
      <input type="text" placeholder='ROLE' value={role} onChange={(e)=>setrole(e.target.value)}></input>
      <button className={styles.addtn} onClick={handleadd}> ADD Developer</button>
      {/* {props.id} */}

    </div>
  )
}

export default AddDeveloper
