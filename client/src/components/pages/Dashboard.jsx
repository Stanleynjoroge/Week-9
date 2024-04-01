import React, { useState } from "react";
import * as uuid from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addProject, deleteProject } from "../stores/actions";
import { saveProjectData, deleteProjectData } from "../stores/actions";
import OutsideClickHandler from "react-outside-click-handler";
import ProjectsCard from "./services/ProjectsCard";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteProject = async (projectId) => {
    try {
      // Remove project from local storage
      localStorage.removeItem(projectId);
      dispatch(deleteProject(projectId));
      // Dispatch deleteProjectData action to delete project from server
      dispatch(deleteProjectData(projectId));
    } catch (error) {
      console.error("Error handling project deletion:", error);
    }
  };
  const handleClick = (projectId) => {
    navigate(`/Home/Dashboard/${projectId}`);
  };

  return (
    <div id={project.id} key={project.id} className="project-tab">
      <div onClick={() => handleClick(project.id)}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
    </div>
  );
}
function RestrictionCard() {
  return (
    <div className="message">
      <p>Project name must be a single word</p>
      <p>If you need mutiple names use '-' to connect them</p>
    </div>
  );
}
const Dashboard = () => {
  const [showRestrictions, setShowRestrictions] = useState(false);
  const projects = useSelector((state) => state.project.projects);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const dispatch = useDispatch();

  const handleAddProject = () => {
    if (!newProject.name.includes(" ") && newProject.name.length >= 5) {
      if (!newProject.name || !newProject.description) {
        console.log("Blank Fields: ", newProject);
      }

      const id = uuid.v4();

      // Dispatch action to add project to Redux store
      dispatch(addProject({ id, ...newProject }));
      dispatch(saveProjectData({ id, ...newProject }));
      // Clear input fields
      setNewProject({ name: "", description: "" });
    } else {
      setShowRestrictions(true); // Show the restrictions message
      setNewProject({ ...newProject, name: "" }); // Reset the project name field
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  return (
    <>
      <div className="dashboard">
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
            {showRestrictions && (
              <OutsideClickHandler
                onOutsideClick={() => {
                  setShowRestrictions(false);
                }}
              >
                <RestrictionCard />
              </OutsideClickHandler>
            )}

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

            <button type="submit" onClick={handleAddProject}>
              Add
            </button>
          </div>

          {/* Display tabs for each project */}
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
       <div className="hidden">
       
        <ProjectsCard />
       
       </div>
         
          
       
      </div>
    </>
  );
};

export default Dashboard;
