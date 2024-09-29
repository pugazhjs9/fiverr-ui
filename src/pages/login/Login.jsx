import React, { useState } from "react";
import axios from "axios"; // To make HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8801/login", {
        email: email,
        password: password,
      });

      // Handle the success case
      setSuccessMessage("Login successful!");
      setErrorMessage("");
      console.log("Login Response: ", response.data);
      
      // Save JWT token to localStorage or cookies if needed
      localStorage.setItem("token", response.data.token);

      // Navigate to the home page
      navigate("/"); // Redirect to home page

    } catch (error) {
      // Handle error case
      setErrorMessage("Login failed. Please check your credentials.");
      setSuccessMessage("");
      console.error("Error during login: ", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

