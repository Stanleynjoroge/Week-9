import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {deleteTicket ,deleteTicketData } from "../stores/actions";
import { useNavigate } from "react-router-dom";
import './ticket.css'

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate= useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ticket');
        setTickets(response.data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();

    // Cleanup function to clear state if needed
    return () => {
      setTickets([]);
      setError(null);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleClick=(ticketId)=>{
 navigate(`/Home/Tickets/${ticketId}`)
  }

  const deleteData = async (ticketId) => {
    try {
       
      localStorage.removeItem(ticketId);
      dispatch(deleteTicket(ticketId));
     dispatch(deleteTicketData( ticketId ));
      // Update tickets state after deletion if needed
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle error if needed
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <div id='div-main'> 
      <div id='ticko'>
        {tickets.map((ticket) => (
          <div className='ticket' id={ticket.id} key={ticket.id}>
            <div onClick={()=>handleClick(ticket.id)}> <h2> {ticket.title}</h2>
            <p> {ticket.description} </p>
            </div>
              <button onClick={() => deleteData(ticket.id)}>Delete</button>
            </div>
        ))}
      </div>
      </div>
     
    </>
  );
};

export default Tickets;
