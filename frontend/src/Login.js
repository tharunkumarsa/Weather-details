import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/login", user);
      setMessage(res.data.message);
      navigate("/home"); // Redirect to home page after login
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Enter email" value={user.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Enter password" value={user.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default Login;
