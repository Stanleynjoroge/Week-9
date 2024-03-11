import { useState } from "react";
import axios from "axios";
import './register.css'
const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/register", formData);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
     <form onSubmit={handleSubmit} className="form">
     <div>
     <label htmlFor="username">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleChange}
    />
   
     </div>
   <div>

   <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
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
 
  
  <button type="submit">Register</button>
</form>
</>
   
  );
};

export default RegisterUser;
