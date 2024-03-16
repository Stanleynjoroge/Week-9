
export const ADD_PROJECT = 'ADD_PROJECT';

export const addProject = (projectData) => ({
  type: ADD_PROJECT,
  payload: projectData
  
});



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
  async () => {
    const response = await fetch(`http://localhost:5000/project/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id})
    })
    return response.json()
  }
)