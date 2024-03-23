import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'

export const ticketLoader = async ({ params }) => {
    try {
      const response = await axios.get(
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

    const ticket =useLoaderData()
   console.log({ticket})
  return (
    <> <div id={ticket.id} className="heading" key={ticket.id}>
    <h1>{ticket.title}</h1>
    
    <p><hr />Description : {ticket.description}<hr /></p>
   
    <div>
    
    <p>Status : {ticket.status}</p>
    <p>created at: {ticket.createdAt}</p>
    </div>
    
    </div>
    </>
  )
}

export default SingleTicket