import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/landing');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <h2 className="loginFormTitle">Login</h2>
      <div className="loginFormInputContainer">
        <label className="loginFormLabel">Username:</label>
        <input
          className="loginFormInput"
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="loginFormInputContainer">
        <label className="loginFormLabel">Password:</label>
        <input
          className="loginFormInput"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
      </div>
      {error && <div className="errorMessage">*{error}</div>}
      <button className="loginFormSubmitBtn" type="submit">
        Login
      </button>
      <p>
        New user? <Link to="/register">Click here to register</Link>
      </p>
    </form>
  );
};

export default Login;
