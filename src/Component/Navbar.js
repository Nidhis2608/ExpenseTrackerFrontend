import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
    color: '#fff',
    padding: '1rem',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 0.5rem',
  };

  return (
    <nav style={navStyle} > 
      <NavLink to="/signup" style={linkStyle}>Signup</NavLink>
      <NavLink to="/login" style={linkStyle}>Login</NavLink>
      <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
    </nav>
  );
};

export default NavBar;
