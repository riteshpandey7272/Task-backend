import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    role: "",
    mobile_num: "",
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/signup", formData); 
      console.log(response.data); 
      
      const userData = { ...response.data.user };
      delete userData.password; 
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/"); 
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <label>Role</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            name="mobile_num"
            value={formData.mobile_num}
            onChange={handleChange}
            required
          />
          <label>Mobile Number</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Name</label>
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>
        <button type="submit" className="btn">
          Sign Up
        </button>
        <div className="sign-link">
          <p>
            Already have an account?{" "}
            <Link to="/auth" className="signIn-link">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
