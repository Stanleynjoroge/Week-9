import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import AssignCard from './services/AssignCard.jsx';
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from 'react-router-dom';
import'./singleticket.css'

export const ticketLoader = async ({ params }) => {
  const API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,})
    try {
      const response = await API.get(
        `http://localhost:5000/ticket/${params.ticketId}`
      );
  
      const data = await response.data;
      if (!data) {
        return null;
      }
      return data;
    } catch (err) {
      console.log("Error Loading Ticket Data", err);
      throw err;
    }
  };

const SingleTicket = () => {
  const[isOpen,setIsOpen]=useState(false)
  const navigate=useNavigate()
  const refreshPage =  () => {
     navigate(window.location.pathname, { replace: true });
      
  }
  const toggleDropdown = () => {
    
    setIsOpen(!isOpen);
  };

    const ticket =useLoaderData()
  return (
    <>
      
     <div id={ticket.id} className="heading" key={ticket.id}>
      
      <div className='title'>
        <h1>{ticket.title}</h1>
        
        <div className="dropdown-toggle">
        
        <button  onClick={toggleDropdown} >
        {isOpen ? "Assign" : "User"}
      </button>
       
      
        <OutsideClickHandler  onOutsideClick={refreshPage}>
      {isOpen &&(
         <div className='menu'>
        <AssignCard/>
        </div>
      )}
       </OutsideClickHandler>
    
        </div>
  
    
      
      </div>
      
      
    
    
    <p>Description : {ticket.description}</p>
   
    <div  className="status">
    
    <p>Status : {ticket.status}</p>
    <p>created at: {ticket.createdAt}</p>
    </div>
    <img src={`https://robohash.org/${ticket.UserId}.png`}  alt="" />
    </div>
    </>
  )
}

export default SingleTicket