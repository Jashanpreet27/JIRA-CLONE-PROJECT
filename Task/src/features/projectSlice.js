import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filedata from '../assets/data.json'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const prodata = createSlice({
    name: "Projectdetails",
    initialState: {
        data: [],
        loading: "false",
        error: null,
        proid: 10,
        devid: 110,
        taskid: 210

    },
    reducers: {
        load: (state) => {
            console.log(filedata)
            state.data = filedata

        },
        add: (state, action) => {
            const newpro = {
                "Project_id": state.proid,
                "Project_Name": action.payload.title,
                "Project_Description": action.payload.dis,
                "start_date": "12-07-2022",
                "end_date": "",
                "status": "NOT STARTED",
                "Developers": []
            }
            state.data.push(newpro)

            toast.success("Project added successfully!", {
                position: "top-center",
                closeOnClick: true


            })
            state.proid++;
            console.log("done")
        },
        adddev: (state, action) => {
            const newdev = {
                "D_id": state.devid,
                "D_Name": action.payload.name,
                "D_Email": action.payload.email,
                "Role": action.payload.role,
                "Tasks": []
            }

            const proj = state.data.find((ele) => ele.Project_id == action.payload.id)

            if (proj) {
                proj.Developers.push(newdev)
                state.devid++;


                toast.success("Developer added successfully!", {
                    position: "top-center",
                    closeOnClick: true

                })
            }
            else {
                toast.error("Project not found!", {
                    position: "top-center",
                    closeOnClick: true
                });
            }

        },
        addtask: (state, action) => {
            const newtask = {
                "Task_id": state.taskid,
                "Task_Name": action.payload.tname,
                "Task_Descript": action.payload.tdiscri,
                "Assign_developer_id": action.payload.dev,
                "Task_Status": "NOT STARTED"
            }
            const proj = state.data.find((ele) => ele.Project_id === action.payload.id);
            const dev = proj.Developers.find((ele) => ele.D_id == action.payload.dev)
            if (proj) {
                if (dev) {
                    dev.Tasks.push(newtask)
                    state.taskid++;
                    toast.success("Task added successfully!", {
                        position: "top-center",
                        closeOnClick: true
                    });
                }
                else {
                    toast.error("Developer not found!", {
                        position: "top-center",
                        closeOnClick: true
                    });

                }
            }
            else {
                toast.error("Project not found!", {
                    position: "top-center",
                    closeOnClick: true
                });
            }
        },
        taskupdate: (state, action) => {
            const proj = state.data.find((ele) => ele.Project_id === action.payload.pid);
            if (proj) {
                const dev = proj.Developers.find((ele) => ele.D_id == action.payload.did)
                if (dev) {
                    const task = dev.Tasks.find((ele) => ele.Task_id == action.payload.taskid)
                    if (task) {
                        task.Task_Status = action.payload.taskStatus;
                        toast.success("Task Status updated successfully!", {
                            position: "top-center",
                            closeOnClick: true
                        });
                    }
                    else {
                        toast.error("task not found", {
                            position: "top-center",
                            closeOnClick: true
                        });
                    }

                }

            }
        },
        projectupdate: (state, action) => {
            const proj = state.data.find((ele) => ele.Project_id === action.payload.id);
            if (proj) {


                proj.status = action.payload.projectStatus;
                toast.success("Task Status updated successfully!", {
                    position: "top-center",
                    closeOnClick: true
                });
            }
            else {
                toast.error("task not found", {
                    position: "top-center",
                    closeOnClick: true
                });
            }
        },
        deleteproject: (state, action) => {
            const proj = state.data.findIndex((ele) => ele.Project_id === action.payload.id);
            if (proj !== -1) {
                state.data.splice(proj, 1);
                toast.success("Project deleted successfully!", {
                    position: "top-center",
                    closeOnClick: true
                });
            } else {
                toast.error("Project not found!", {
                    position: "top-center",
                    closeOnClick: true
                });
            }
        },
        deletedeveloper: (state, action) => {
            const proj = state.data.find((ele) => ele.Project_id === action.payload.projectid);
            if (proj) {
                const dev = proj.Developers.findIndex((ele) => ele.D_id == action.payload.developerid)
                if (dev !== -1) {
                    proj.Developers.splice(dev, 1);
                    toast.success("Developer deleted successfully!", {
                        position: "top-center",
                        closeOnClick: true
                    });
                } else {
                    toast.error("Developer not found!", {
                        position: "top-center",
                        closeOnClick: true
                    });
                }
            }

            console.log(action)
        },
        deletetask: (state, action) => {
            const proj = state.data.find((ele) => ele.Project_id === action.payload.projectid);
            if (proj) {

                const dev = proj.Developers.find((ele) => ele.D_id == action.payload.developerid)
                if (dev) {
                    const task = dev.Tasks.findIndex((ele) => ele.Task_id == action.payload.taskid)
                    if (task !== -1) {
                        dev.Tasks.splice(dev, 1);
                        toast.success("Task deleted successfully!", {
                            position: "top-center",
                            closeOnClick: true
                        });
                    } else {
                        toast.error("Task not found!", {
                            position: "top-center",
                            closeOnClick: true
                        });
                    }

                }


            }

            console.log(action)
        },
        editproject: (state, action) => {

            const proj = state.data.find((ele) => ele.Project_id === action.payload.projectid);
            if (proj) {

                proj.Project_Name = action.payload.title;
                proj.Project_Description = action.payload.dis;

                toast.success("Project Details Updated successfully!", {
                    position: "top-center",
                    closeOnClick: true
                });
            }
            else {
                toast.error("task not found", {
                    position: "top-center",
                    closeOnClick: true
                });
            }



        },
        devedit: (state, action) => {
                    const proj = state.data.find((ele) => ele.Project_id === action.payload.project_id);
                    if(proj){
                        const dev = proj.Developers.find((ele) => ele.D_id == action.payload.Dev_id)
            if(dev){
                dev.D_Name=action.payload.name;
                dev.D_Email=action.payload.email;
                dev.Role=action.payload.role;
                toast.success("Developer Details Updated successfully!", {
                    position: "top-center",
                    closeOnClick: true
                });
            }
            else {
                toast.error("task not found", {
                    position: "top-center",
                    closeOnClick: true
                });
            }

            

                    }
            console.log(action)
        }


    }

})
export const { load, add, adddev, addtask, taskupdate, projectupdate, deleteproject, deletedeveloper, deletetask, editproject ,devedit} = prodata.actions
export default prodata.reducer