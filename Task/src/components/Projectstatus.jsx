import React, { useState } from 'react'
import './Projectstatus.css'
import { useDispatch } from 'react-redux';
import { projectupdate } from '../features/projectSlice';
const Projectstatus = ({id}) => {
    const [show,setshow]=useState(false);
    const dispatch=useDispatch();
    const handleStatusChange = (e) => {
    
        dispatch(projectupdate({ projectStatus: e.target.value, id }));
      };
  return (
    <div>
      <button className='link-button' onClick={()=>setshow(!show)}>CHANGE STATUS ? </button>
      
      {show && 
      <>
      <div className='option'>
      <label><input type="radio"
      value="PENDING"
      name="a"
      onClick={(e)=>handleStatusChange(e,id)}
      ></input>PENDING</label>

      
      <label><input type="radio"
      value="In Progress"
      name="a"
      onClick={(e)=>handleStatusChange(e,id)}
      ></input>IN PROGRESS</label>


      <label><input type="radio"
      value="REVIEW"
      name="a"
      onClick={(e)=>handleStatusChange(e,id)}
      ></input>REVIEW</label>



      <label><input type="radio"
      value="TESTING"
      name="a"
      onClick={(e)=>handleStatusChange(e,id)}
      ></input>TESING(QA)</label>

<label><input type="radio"
      value="COMPLETED"
      name="a"
      onClick={(e)=>handleStatusChange(e,id)}
      ></input>COMPLETED✅</label>
      </div>
            </>
      
      }
      
      
      
    </div>
  )
}

export default Projectstatus
