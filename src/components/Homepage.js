import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addtask , deltask, edittask } from '../services/auth/authAPI';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Homepage = () => {
  const {taskData,signUpData} = useSelector((state)=>state.auth);  
  const [msg,setMsg] = useState("");
  const dispatch = useDispatch();
  function addTaskk(e){
    e.preventDefault();
    // console.log(signUpData);
    // console.log("msg ",msg);
    dispatch(addtask(msg,signUpData?.email));
    setMsg("");
  }
  function titleChangeHandler(e){
    // console.log("msg ",msg);
    // console.log("e.target.value ",e.target.value);
    setMsg(e.target.value);
  };
  function titleChangeEditHandler(e){
    // console.log("msg ",msg);
    // console.log("e.target.value ",e.target.value);
    setEditmsg(e.target.value);
  };
  // useEffect(()=>{
  //   // console.log("Task Data is .... ",taskData);
  // },[taskData]);
  function handleClick(val){
    // console.log(val._id,signUpData?.email);
    dispatch(deltask(val._id,signUpData?.email));
  }
  function editChangeHandler(val){
    // console.log("in editchangehandler ",val._id,signUpData?.email,editmsg);
    dispatch(edittask(val._id,signUpData?.email,editmsg));
  }
  const [id,setId] = useState();
  const [flag,setFlag] = useState(false);
  function handleSetChange(flag,val){
    setFlag(!flag);
    setId(val._id);
    setEditmsg(val.msg);
  }
  const [editmsg,setEditmsg] = useState("");
  return (
    <div className=' flex justify-center items-center ' >
      <div>
      <div className="border-2 border-black rounded-lg m-20 p-5 max-w-xl " >
      <div >Hello { signUpData?.firstName } {" "} { signUpData?.lastName } </div>
      <h1>Your Tasks To Do & Informations are ... </h1>
      < form onSubmit={addTaskk} >
        <input type='text'
        placeholder='Write Task To Add Press +'
        className='border-2 border-black text-black rounded-lg ' value={msg} onChange={titleChangeHandler} ></input>
        <button type="Submit" >+</button>
      </form>
      { taskData?.length>0 && 
        taskData?.map((val)=> {
          return ( 
          <div>
          {
            ( flag && id===val._id ) ? 
            ( <div> <input type='text' className='border-2 border-black text-black rounded-lg' value={editmsg} onChange={titleChangeEditHandler} /> </div> ) :
            ( <div key={val._id} > {val.msg} </div> )  
          }
          <button onClick={()=> (handleSetChange(flag,val))  } > {(flag && id===val._id)  ? ( <div> <div onClick={ ()=> editChangeHandler(val)} >Submit</div></div>) : ( <div> <FaEdit /> </div>)} </button>
          <button onClick={()=> handleClick(val) } > <MdDelete /> </button>
          </div> )
        }
        )
      }
      </div>
    </div>
    </div>
  )
}

export default Homepage