import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filedata from '../assets/data.json'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const prodata = createSlice({
    name: "Projectdetails",
    initialState: {
        data: [],
        loading: "false",
        error: null
    },
    reducers: {
        load: (state) => {
            console.log(filedata)
            state.data = filedata

        },
        add: (state, action) => {
            const newpro = {
                "Project_id": state.data.length + 1,
                "Project_Name": action.payload.title,
                "Project_Description": action.payload.dis,
                "start_date": "12-07-2022",
                "end_date": "",
                "status": "IN PROGRESS",
                "Developers": []
            }
            state.data.push(newpro)

            toast.success("Project added successfully!", {
                position: "top-center",
                closeOnClick: true

            })
            console.log("done")
        },
        adddev: (state, action) => {
            const newdev = {
                "D_id": state.data.length + 1,
                "D_Name": action.payload.name,
                "D_Email": action.payload.email,
                "Role": action.payload.role,
                "Tasks": []
            }
            
            const proj = state.data.find((ele) => ele.Project_id == action.payload.id)
          
            if (proj) {
                proj.Developers.push(newdev)
                
            }
            
            toast.success("Developer added successfully!", {
                position: "top-center",
                closeOnClick: true

            })
        }



    }

})
export const { load, add, adddev } = prodata.actions
export default prodata.reducer