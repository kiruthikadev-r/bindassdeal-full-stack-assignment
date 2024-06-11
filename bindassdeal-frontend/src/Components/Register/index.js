import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './index.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log("Registration response:", response);
      if (response.status === 201) {
        setLoading(false);
        navigate('/login');
        console.log("Navigating to landing page");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setLoading(false);
      setError("User already exists"); 
    }
  };

  return (
    <form className="registrationForm" onSubmit={handleSubmit}>
      <h2 className="registrationFormTitle">Register</h2>
      <div className="registrationFormInputContainer">
        <label className="registrationFormLabel">Username:</label>
        <input
          className="registrationFormInput"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="registrationFormInputContainer">
        <label className="registrationFormLabel">Email:</label>
        <input
          className="registrationFormInput"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="registrationFormInputContainer">
        <label className="registrationFormLabel">Password:</label>
        <div className="passwordInputContainer">
          <input
            className="registrationFormInput"
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <span
            className="togglePasswordVisibility"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      <div className="registrationFormInputContainer">
        <label className="registrationFormLabel">Confirm Password:</label>
        <div className="passwordInputContainer">
          <input
            className="registrationFormInput"
            type={confirmPasswordVisible ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <span
            className="togglePasswordVisibility"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      {error && <div className="errorMessage">*{error}</div>}
      <button className="registrationFormSubmitBtn" type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p className="registrationFormLink">
        Already a user? <Link to="/login">Click here to login</Link>
      </p>
    </form>
  );
}

export default Registration;
