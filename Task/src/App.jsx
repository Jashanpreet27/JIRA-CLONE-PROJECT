import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { deletedeveloper, deleteproject, deletetask, load, taskupdate } from './features/projectSlice'
import AddProject from './components/AddProject'
import AddDeveloper from './components/AddDeveloper'
import { ToastContainer } from 'react-toastify'
import Task from './components/Task'
import Projectstatus from './components/Projectstatus'

import img from './assets/delete.png'
import editimg from './assets/edit.png'
import Editproject from './components/Editproject'
import Editdeveloper from './components/Editdeveloper'
function App() {
  const [count, setCount] = useState(0)
  const [visibleDev, setVisibleDev] = useState({});
  const [visibleTask, setVisibleTask] = useState({});
  const dispatch = useDispatch();
  const [status, settaskstatus] = useState()
  const [devsec, setdevsec] = useState({})
  const [tasksec, settasksec] = useState({})
  const [editproject,seteditproject]=useState({});
  const [editdev,seteditdev]=useState({});
  const [taskStatus, setTaskStatus] = useState(""); // local state for task status

  const handleStatusChange = (e, taskid, did, pid) => {
    setTaskStatus(e.target.value)
    dispatch(taskupdate({ taskStatus: e.target.value, taskid, did, pid }));
  };
  const toggleDevVisibility = (projectid) => {
    setVisibleDev((prev) => ({ ...prev, [projectid]: !prev[projectid] }))
    console.log(visibleDev[projectid]);
  }
  
  const toggleeditproject=(index) =>{
    seteditproject((prev) => ({ ...prev, [index]: !prev[index] }))
    // console.log(editproject[index]);
  }

  const toggleeditdev=(index) =>{
    seteditdev((prev) => ({ ...prev, [index]: !prev[index] }))
    // console.log(editproject[index]);
  }


  const toggleTaskVisibility = (Developerid) => {
    setVisibleTask((prev) => ({ ...prev, [Developerid]: !prev[Developerid] }))

  }
  const toggleaddVisibility = (Developerid) => {
    setdevsec((prev) => ({ ...prev, [Developerid]: !prev[Developerid] }))
  }
  const toggleaddtaskVisibility = (index) => {
    settasksec((prev) => ({ ...prev, [index]: !prev[index] }))
  }
  const pro = useSelector((state) => {
    // console.log(state.app.data)
    return state.app;
  })

  useEffect(() => {
    dispatch(load())
  }, []);
  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'pending';
      case 'In Progress':
        return 'in-progress';
      case 'REVIEW':
        return 'review';
      case 'TESTING':
        return 'testing';
      case 'COMPLETED':
        return 'completed';
      default:
        return '';
    }
  };
  function handleprojectdelte(projectid) {
    dispatch(deleteproject({ id: projectid }))
  }
  function handledeveloperdelte(projectid, developerid) {
    dispatch(deletedeveloper({ projectid, developerid }))
  }
  function handletaskdelete(projectid, developerid, taskid) {
    dispatch(deletetask({ projectid, developerid, taskid }))
  }

  
  return (
    <>

      <div className='container'>
        <Navbar />

        <AddProject />
        <div className='PROJECTS_CONTAINER'>
          {

            pro.data.map((ele, index) => {
              return (
                <div className='Projects'
                  key={ele.Project_id}>

                  <h3>{ele.Project_Name} <br /><br /><b className={getStatusClass(ele.status)}> (  {ele.status} )</b></h3>
                  <button className='deletelogo' onClick={() => handleprojectdelte(ele.Project_id)}><img src={img} alt="DELETE" ></img></button>
                  <button className='editlogo' onClick={() => toggleeditproject(index) }><img src={editimg} alt="Edit" ></img></button>
                  <br/><br /><Projectstatus id={ele.Project_id} />
                  <br /> <p>{ele.Project_Description}</p>
                  <br /><p>Start on {ele.start_date}</p>
                  {editproject[index] && <Editproject name={ele.Project_Name} Desc={ele.Project_Description} id={ele.Project_id}/>}
                  <br /> <button onClick={() => toggleDevVisibility(index)}>DEVELOPER LIST</button>








                  {visibleDev[index] &&
                    <>
                      {
                        ele.Developers.map((item, index) => {
                          return (
                            <>
                              <div className='Developercontainer'
                                key={index}>
                                <p>DEVELOPER NAME : <b>{item.D_Name}</b></p>
                                <button className='deletelogodev' onClick={() => handledeveloperdelte(ele.Project_id, item.D_id)}><img src={img} alt="DELETE" ></img></button>
                                <button className='editlogodev' onClick={() => toggleeditdev(index) }><img src={editimg} alt="Edit" ></img></button>
                                <br /> <p>DEVELOPER ID : <b>{item.D_id}</b></p>
                                <br /> <p>ROLE : <b>{(item.Role)}</b></p>
                                <br /><p>DEVELOPER EMAIL : <b>{item.D_Email}</b></p>


                                {editdev[index] && <Editdeveloper name={item.D_Name} email={item.D_Email} role={item.Role} pid={ele.Project_id} did={item.D_id}/>}
                                <br /><button
                                  className='taskbtn'
                                  onClick={() => toggleTaskVisibility(item.D_id)}
                                >TASKS</button>
                                {visibleTask[item.D_id] &&

                                  item.Tasks.map((task, index) => {
                                    return (
                                      <>
                                        <div className='taskcontainer' key={index}>
                                          <p>TASK  : <b>{task.Task_id}</b></p>

                                          <br /><p>TASK  : <b>{task.Task_Name}</b></p>
                                          <button className='deletelogotask' onClick={() => handletaskdelete(ele.Project_id, item.D_id, task.Task_id)}><img src={img} alt="DELETE" ></img></button>
                                          <br /><p>TASK DESRIPTION : <b>{task.Task_Descript}</b></p>
                                          <br /> <p>TASK STATUS : <b className={getStatusClass(task.Task_Status)}>{task.Task_Status}</b></p>
                                          <hr></hr><br /><br /><h5>UPDATE STATUS</h5>
                                          <br /><div className='radi'>
                                            <div className='taskstatusoption'>

                                              <label>
                                                <input
                                                  type="radio"
                                                  name={`status_${task.Task_id}`}
                                                  value="PENDING"

                                                  onClick={(e) => handleStatusChange(e, task.Task_id, item.D_id, ele.Project_id)}
                                                />
                                                PENDING
                                              </label>
                                              <label>
                                                <input
                                                  type="radio"
                                                  name={`status_${task.Task_id}`}
                                                  value="In Progress"

                                                  onClick={(e) => handleStatusChange(e, task.Task_id, item.D_id, ele.Project_id)}
                                                />
                                                IN_PROGRESS
                                              </label>
                                              <label>
                                                <input
                                                  type="radio"
                                                  name={`status_${task.Task_id}`}
                                                  value="REVIEW"

                                                  onClick={(e) => handleStatusChange(e, task.Task_id, item.D_id, ele.Project_id)}
                                                />
                                                REVIEW
                                              </label>
                                              <label>
                                                <input
                                                  type="radio"
                                                  name={`status_${task.Task_id}`}
                                                  value="TESTING"

                                                  onClick={(e) => handleStatusChange(e, task.Task_id, item.D_id, ele.Project_id)}
                                                />
                                                TESING(QA)
                                              </label>
                                              <label><input type="radio"
                                                value="COMPLETED"
                                                name={`status_${task.Task_id}`}
                                                onClick={(e) => handleStatusChange(e, task.Task_id, item.D_id, ele.Project_id)}
                                              ></input>COMPLETED✅</label>
                                            </div>

                                          </div>
                                        </div>

                                      </>
                                    )
                                  })

                                }
                              </div>

                            </>
                          )
                        })
                      }
                      <div className='Adddevarea'>
                        <button className='adddevbtn' onClick={() => toggleaddVisibility(index)}>ADD DEVELOPER</button>
                        {devsec[index] &&
                          <AddDeveloper id={ele.Project_id} />
                        }
                      </div>
                      <div>
                        <button className='addtaskbtn' onClick={() => toggleaddtaskVisibility(index)}>ADD TASK</button>
                        {tasksec[index] &&
                          <Task id={ele.Project_id} />
                        }
                      </div>
                    </>

                  }



                </div>

              )
            })


          }

        </div>

      </div>
      <ToastContainer />
    </>
  )
}

export default App
