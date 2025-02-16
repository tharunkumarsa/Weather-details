import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    return /(?=.*[A-Z])(?=.*\d)/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validatePassword(user.password)) {
      setMessage("Password must contain at least one uppercase letter and one number");
      return;
    }

    try {
      await axios.post("http://localhost:5000/signup", user);
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter name" value={user.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Enter email" value={user.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Enter password" value={user.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
