import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'; 

const Navbar = () => {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbarList">
        <li className="navbarItem">
          <Link to="/landing" className="navbarLink">Landing Page</Link>
        </li>
        <li className="navbarItem">
          <button onClick={handleLogout} className="navbarButton">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
