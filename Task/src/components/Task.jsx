import React, { useState } from 'react'
import styles from "./Task.module.css"
// "Task_id": "1",
//     "Task_Name": "Make header",
//         "Task_Descript": "Make a good gui",
//             "Assign_developer_id": "",
//                 "Task_Status": "Inprogress"
//                         }
const Task = () => {
const [tname,settname]=useState("");
const [tdiscri,settdescip]=useState("");
    return (
        <div className={styles.taskform}>
            <h2>TASK DETAIL</h2>
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

<button>ADD TASK</button>
        </div>
    )
}

export default Task
