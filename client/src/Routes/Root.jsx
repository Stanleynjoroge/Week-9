import {
  Outlet,
  Link,
  Form,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

const Root = () => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  // Check if user is logged in on page load
  useEffect(() => {
      const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
      };
      const token = getCookie("valid_token");
    if (token) {
      setLoggedIn(true);
    }else {
      setLoggedIn(false);
    }
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 2 seconds
    }, 3000);
  }, [loggedIn]);
  useEffect(() => {
    // Define the page titles based on the routes
    const titles = {
      "/Home/Dashboard": "Dashboard",
      "/Home/Tickets": "Tickets",
      "/Home/Tasks": "Tasks Manager",
      "/Dashboard/:projectId": "Projects",
    };

    // Set the page title based on the current route
    const currentTitle = titles[location.pathname];
    setPageTitle(currentTitle);
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/project");
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

  if (isLoading) return <p className="spinner"></p>;

  if (loggedIn === true) {
    return (
      <>
        <div id="navbar">
          <div id="search">
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search"
                placeholder="Search"
                type="search"
                name="q"
              />
            </form>
          </div>
          <div id="header">
            <p></p>
            <h1>{pageTitle}</h1>
          </div>
        </div>

        <div id="main">
          <div id="sidebar">
            <div id="home">
              <hr />
              <h1>Home</h1>
              <nav>
                <ul>
                  {" "}
                  <Link to={"Dashboard"}>Dashbord</Link>
                </ul>
                <ul>
                  <Link to={`Tickets`}>Tickets</Link>
                </ul>
                <ul>
                  <Link to={`Tasks`}>Tasks</Link>
                </ul>
              </nav>
            </div>
            <div id="home">
              <hr />
              <h1>Projects</h1>
              <div id="projects">
                <nav>
                  {projects.map((project,index) => (
                    <Link key={index} to={`/Home/Dashboard/${project.id}`}>
                      <ul>{project.name}</ul>
                    </Link>
                  ))}
                </nav>
              </div>
              <hr />
            </div>

            <div id="profile">
              <h1>Profile</h1>
              <div>
                <img src="" alt="pic" />
                <p>profile name</p>
              </div>
            </div>
          </div>

          <div id="detail">
            <Outlet />
          </div>
        </div>
      </>
    );
  } else {
    return <p>not logged in</p>;
  }
};

export default Root;
