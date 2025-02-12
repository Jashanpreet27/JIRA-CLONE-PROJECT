import React, { useState } from 'react'
import styles from "./Addproject.module.css"
import { useDispatch } from 'react-redux'
import { add } from '../features/projectSlice'
const AddProject = () => {
    const [showadd,setshowadd]=useState(false)
    const [title,settitle]=useState("")
    const [dis,setdiscr]=useState("")
  const dispatch=useDispatch();
    function handleadd(e){
   
   e.preventDefault()
   dispatch(add({title,dis}))
   settitle("");
   setdiscr("")
  }
    return (
    <div className={styles.container}>
        <button onClick={()=>{
            setshowadd(!showadd)
        }} className={styles.toggleButton }>ADD NEW PROJECT</button>
        {showadd && 
        <div className={styles.form}>

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
onChange={(e)=>setdiscr(e.target.value)}></textarea>
<button className={styles.submitButton }
onClick={handleadd}
>ADD PROJECT</button>
        </form>
      </div>
        
        }
      
    </div>
  )
}

export default AddProject
