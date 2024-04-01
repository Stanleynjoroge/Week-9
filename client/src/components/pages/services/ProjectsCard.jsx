import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ProjectsCard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const API = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,
      });
      try {
        const response = await API.get("/project");
        setProjects(response.data);
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchData();

    // Cleanup function to clear state if needed
    return () => {
      setProjects([]);
      setError(null);
    };
  }, []);
  const handleClick = (projectId) => {
    navigate(`/Home/Dashboard/${projectId}`);
  };
  return (
    <>
     <div className="hidden-div">
    
      {projects.map((project, index) => (
        <div
          id={project.id}
          key={project.id}
          onClick={() => handleClick(project.id)}
          className="project-card"
        >
          <h4>{project.name}</h4>
          <p className="description">{project.description}</p>
        </div>
      ))}
      </div>
    </>
  );
};

export default ProjectsCard;
