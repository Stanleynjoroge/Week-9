import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../stores/actions";
import { saveProjectData } from "../stores/actions";
import OutsideClickHandler from 'react-outside-click-handler';
import "./dashboard.css";

function ProjectCard({project}) {
  const dispatch = useDispatch();

  const handleDeleteProject = async () => {
   
  };

  return (
    <div id={project.name} className="project-tab">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <button onClick={handleDeleteProject}>Delete</button>
    </div>
  );
}
function RestrictionCard(){
  return(
    
   <dialogue className="message">
    <p>Project name must be a single word</p>
    <p>If you need mutiple names use '-' to connect them</p>
  </dialogue>
    
        
        
    
  )
}
const Dashboard = () => {
  const [showRestrictions, setShowRestrictions] = useState(false);
  const projects = useSelector((state) => state.project.projects)
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const dispatch = useDispatch();

  const handleAddProject =() => {
    if (!newProject.name.includes(" ") && newProject.name.length >= 5) {
    if(!newProject.name || !newProject.description){
      console.log('Blank Fields: ', newProject)
      return;
    }

    // Dispatch action to add project to Redux store
    dispatch(addProject(newProject));
    dispatch(saveProjectData( newProject ));
    // Clear input fields
    setNewProject({ name: "", description: "" });
  }else{
    setShowRestrictions(true); // Show the restrictions message
      setNewProject({ ...newProject, name: "" }); // Reset the project name field
  }};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  return (
    <div id="container">
      <div className="projo">
        <input
          type="text"
          required
          placeholder="Project Name"
          name="name"
          value={newProject.name}
          onChange={handleInputChange}
        />
        {showRestrictions&&( <OutsideClickHandler onOutsideClick={()=>{setShowRestrictions(false)}} ><RestrictionCard/></OutsideClickHandler>)

}
        <hr />

        <input
          as="textarea"
          type="text"
          required
          placeholder="Project Description"
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
        />


        <hr />
        
        <button type="submit" onClick={handleAddProject}>Add</button>
      </div>

      {/* Display tabs for each project */}
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default Dashboard;
