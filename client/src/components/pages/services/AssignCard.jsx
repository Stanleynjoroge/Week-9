import React, { useEffect, useState } from "react";
import axios from "axios";
import { updateTicketData } from "../../stores/actions";
import { useParams } from "react-router-dom";
import {useDispatch} from 'react-redux'
const AssignCard = () => {
  const [users, setUsers] = useState([]);
  const[error,setError] =useState(null)
  const[isactive, setIsActive]=useState(false)
  const params= useParams()
  const dispatch= useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const API = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,})
      try {
        const response = await API.get("http://localhost:5000/register/user");
        setUsers(response.data);
   
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchData();

    // Cleanup function to clear state if needed
    
  }, []);
  const handleClick=(userId)=>{
  
    const ticketData={
      id:params.ticketId
    }

  dispatch(updateTicketData({...ticketData, UserId: userId}))
  }
  return (
    <>
      {users.map((user,index) => (
        <div onClick={()=>handleClick(user.id)} key={index} id='user' >
             <img src={`https://robohash.org/${user.id}.png`}  alt="" />
          <p>{user.email}
         </p>
        </div>
      ))}
    </>
  );
};

export default AssignCard;
