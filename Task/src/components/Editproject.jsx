import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from "./AddProject.module.css"
import { editproject } from '../features/projectSlice'
const Editproject = (props) => {
    const [showadd,setshowadd]=useState(false)
    const [title,settitle]=useState(props.name)
    const [dis,setdiscr]=useState(props.Desc)
const projectid=props.id;
  const dispatch=useDispatch();
  function handleedit(e){
    e.preventDefault()
    dispatch(editproject({title,dis,projectid}))
  }
  return (
    <div className={styles.container}>
            <h4>Project Details (ID : {props.id})</h4> 
           
    
            <form>
    <input
    className={styles.name}
    type='text' 
    value={title}
    placeholder='Enter Project Name'
    onChange={(e)=>settitle(e.target.value)}></input>
    
    
    
    <textarea
    value={dis}
    className={styles.description }
    placeholder='Discription of the project'
    onChange={(e)=>setdiscr(e.target.value)}></textarea><br/>
    <br/>
    <button className={styles.submitButton }
   onClick={handleedit}
    >EDIT PROJECT DETAILS</button>
            </form>
          </div>
            
            
          
        
  )
}

export default Editproject
