import React, { useState } from 'react'
import styles from "./Task.module.css"
import { useDispatch } from 'react-redux';
import { addtask } from '../features/projectSlice';
// "Task_id": "1",
//     "Task_Name": "Make header",
//         "Task_Descript": "Make a good gui",
//             "Assign_developer_id": "",
//                 "Task_Status": "Inprogress"
//                         }
const Task = ({id}) => {
    const dispatch=useDispatch();
const [tname,settname]=useState("");
const [dev,setdev]=useState("");
const [tdiscri,settdescip]=useState("");
function handleclick(e){
    e.preventDefault()
    if(dev=== ""){
        alert("Enter Developer Id !!")
    }else
    if(tname === ""){
        alert("Please Enter Task name !!")
    }else if(tdiscri === ""){
        alert("Enter Task discription!!!")
    }
    else{
    dispatch(addtask({tname,dev,tdiscri,id}));
}
setdev("");
settdescip("");
settname("");

}

    return (
        <div className={styles.taskform}>
            <h2>TASK DETAIL</h2>
<input type="text"
placeholder='DEVELOPER ID'
value={dev}
onChange={(e)=>setdev(e.target.value)}
></input>
<input type="text"
placeholder='TASK Name'
value={tname}
onChange={(e)=>settname(e.target.value)}
></input>
<input type="text"
placeholder='TASK Discription'
value={tdiscri}
onChange={(e)=>settdescip(e.target.value)}
></input>

<button onClick={handleclick}>ADD TASK</button>
        </div>
    )
}

export default Task
