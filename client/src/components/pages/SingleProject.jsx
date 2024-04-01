import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import * as uuid from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, deleteTicket } from "../stores/actions";
import { saveTicketData, deleteTicketData } from "../stores/actions";
import "./singleProject.css";

export const projectLoader = async ({ params }) => {
  const API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,})
  try {
    const response = await API.get(
      `http://localhost:5000/project/${params.projectId}`
    );

    const data = await response.data;
    if (!data) {
      return null;
    }
    return data;
  } catch (err) {
    console.log("Error Loading Project Data", err);
    throw err;
  }
};
export const TicketCard = ({ ticket }) => {
  const dispatch = useDispatch();

  const handleDeleteTicket = (ticketId) => {
    try {
      localStorage.removeItem(ticketId);
      dispatch(deleteTicket(ticketId));
      dispatch(deleteTicketData(ticketId));
    } catch (error) {
      console.error("Error handling project deletion:", error);
    }
  };
  return (
    <div id={ticket.id} className="ticko">
      <div>
        <h3>{ticket.title}</h3>
        <p>{ticket.description}</p>
      </div>
      <button onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>
    </div>
  );
};
const SingleProject = () => {
  const { projectId } = useParams();
  const project = useLoaderData();

  const tickets = useSelector((state) => state.project.tickets);
  //filter tickets  by current project ID
  const filteredTickets = tickets.filter((item) => item.projectId === projectId);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  


  const handleAddTicket = () => {
    const id = uuid.v4();

    setNewTicket({ title: "", description: "" });
    // Dispatch action to add project to Redux store
    const newTicketWithProjectId = {
      ...newTicket,
      id,
      projectId
    };
    dispatch(addTicket(newTicketWithProjectId));
    

    dispatch(saveTicketData(newTicketWithProjectId));
    // Clear input fields
    setNewTicket({ title: "", description: "" });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  return (
    <>
      <div className="project">
        <div id={project.id} className="heading" key={project.id}>
          <h1>{project.name}</h1>
          <p>Description : {project.description}</p>
        </div>
        <div className="content">
          <div className="ticko">
            <input
              type="text"
              required
              placeholder="Bug title"
              name="title"
              value={newTicket.title}
              onChange={handleInputChange}
            />
            <hr />

            <input
              as="textarea"
              type="text"
              required
              placeholder="Bug Description"
              name="description"
              value={newTicket.description}
              onChange={handleInputChange}
            />

            <hr />

            <button type="submit" onClick={handleAddTicket}>
              Add
            </button>
          </div>
          {filteredTickets.map((ticket, index) => (
            <TicketCard key={index} ticket={ticket} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleProject;
