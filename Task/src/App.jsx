import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { load } from './features/projectSlice'
import AddProject from './components/AddProject'
import AddDeveloper from './components/AddDeveloper'
import { ToastContainer } from 'react-toastify'
import Task from './components/Task'


function App() {
  const [count, setCount] = useState(0)
  const [visibleDev, setVisibleDev] = useState({});
  const [visibleTask, setVisibleTask] = useState({});
  const [devsec, setdevsec] = useState({})
  const [tasksec, settasksec] = useState({})
  const toggleDevVisibility = (projectid) => {
    setVisibleDev((prev) => ({ ...prev, [projectid]: !prev[projectid] }))
    console.log(visibleDev[projectid]);
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load())
  }, []);

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
                  <h3>{ele.Project_Name} <br />(  {ele.status} )</h3>
                  <p>{ele.Project_Description}</p>
                  <p>Start on {ele.start_date}</p>

                  <button onClick={() => toggleDevVisibility(index)}>DEVELOPER LIST</button>

                  {visibleDev[index] &&
                    <>
                      {
                        ele.Developers.map((item, index) => {
                          return (
                            <>
                              <div className='Developercontainer'
                                key={index}>
                                <p>DEVELOPER NAME : <b>{item.D_Name}</b></p>
                                <p>DEVELOPER ID : <b>{item.D_id}</b></p>
                                <p>ROLE : <b>{(item.Role)}</b></p>
                                <p>DEVELOPER EMAIL : <b>{item.D_Email}</b></p>
                                <button
                                  className='taskbtn'
                                  onClick={() => toggleTaskVisibility(item.D_id)}
                                >TASKS</button>
                                {visibleTask[item.D_id] &&

                                  item.Tasks.map((task, index) => {
                                    return (
                                      <>
                                        <div className='taskcontainer' key={index}>
                                          <p>TASK  : <b>{task.Task_Name}</b></p>
                                          <p>TASK DESRIPTION : <b>{task.Task_Descript}</b></p>
                                          <p>TASK STATUS : <b>{task.Task_Status}</b></p>

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
                        <button className='adddevbtn' onClick={() => toggleaddtaskVisibility(index)}>ADD TASK</button>
                        {tasksec[index] &&
                          <Task />
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
