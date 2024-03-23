import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import './register.css';



const LoginUser = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      console.log("Login successful:", response.data);

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
      });
      localStorage.setItem('token',response.data.token);
      setLoggedIn(true);
  
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    
        <>
        {loggedIn ? <Navigate  to="/Home" /> : null}
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="user@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <a href="/Register">Signup</a></p>
        </>
   ) 
    
  
};

export default LoginUser;
