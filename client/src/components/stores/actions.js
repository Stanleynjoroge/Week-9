
export const ADD_PROJECT = 'ADD_PROJECT';

export const addProject = (projectData) => ({
  type: ADD_PROJECT,
  payload: projectData
  
});
export const DELETE_PROJECT ='DELETE_PROJECT'
export const deleteProject = (projectId) => ({
  type: DELETE_PROJECT,
  payload: projectId,
});

//ticket reducer
export const ADD_TICKET = 'ADD_TICKET'
export const addTicket =(ticketData)=>({
    type : ADD_TICKET ,
    payload : ticketData
})

export const DELETE_TICKET ='DELETE_TICKET'
export const deleteTicket =(ticketId)=>({
    type : DELETE_TICKET,
    payload: ticketId
})

import { createAsyncThunk } from '@reduxjs/toolkit';
// Define an asynchronous action to save project data
export const saveProjectData = createAsyncThunk(
  'project/saveProjectData',
  async (newProject) => {
    try {    
       await fetch('http://localhost:5000/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      console.log('Project data saved successfully.');
    } catch (error) {
      console.error('Error saving project data:', error);
      throw error; // Propagate the error
    }
  }
);

export const deleteProjectData = createAsyncThunk(
  'project/deleteProjectData',
  async (projectId) => {
    try {
      const response = await fetch(`http://localhost:5000/project?id=${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting project data:', error);
      throw error;
    }
  }
);

export const saveTicketData= createAsyncThunk(
'ticket/saveTicketData',
async(newTicket)=>{
  try {    
    await fetch('http://localhost:5000/ticket', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(newTicket),
   });
   console.log('Ticket data saved successfully.');
 } catch (error) {
   console.error('Error saving project data:', error);
   throw error; // Propagate the error
 }
})
export const deleteTicketData= createAsyncThunk(
'ticket/deleteTicketData',
async(ticketId)=>{
  try {
    const response = await fetch(`http://localhost:5000/ticket?id=${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting project data:', error);
    throw error;
  }
})
export const updateTicketData = createAsyncThunk(
  'ticket/updateTicketData',
  async (ticketData, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/ticket?id=${ticketData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket data');
      }

      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  })



export const loginUser =  createAsyncThunk(
  "user/login",
  async payload=>{
    let res=await fetch("http://localhost:5000/login",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(payload)
    })
    const user={...await res.json(),token:payload.password};
    localStorage.setItem("user",JSON.stringify(user));
    return user;
  }
)



// REDUCER