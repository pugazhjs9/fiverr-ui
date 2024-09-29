import React, { useState } from "react";
import axios from "axios"; // To make HTTP requests
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import "./Register.scss";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8801/signup", {
        email: email,
        password: password,
      });

      // Handle the success case
      setSuccessMessage("Signup successful! Redirecting to login...");
      setErrorMessage("");
      console.log("Signup Response: ", response.data);

      // Navigate to the login page
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000); // Redirect after 2 seconds

      // Clear form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      // Handle error case
      if (error.response && error.response.status === 400) {
        setErrorMessage("User already exists. Please log in.");
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
      setSuccessMessage("");
      console.error("Error during signup: ", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}

export default Register;

