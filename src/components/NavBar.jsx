import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';

const NavBar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavBar = () => {
    setIsCollapsed(!isCollapsed);
    onToggle(!isCollapsed);
  };

  return (
    <nav className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="navbar-logo">
        {!isCollapsed ? (
          <a href="/">MyLogo</a>
        ) : (
          <button className="menu-button" onClick={toggleNavBar}>
            <FaBars />
          </button>
        )}
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">
            <FaHome />
            {!isCollapsed && <span>Home</span>}
          </a>
        </li>
        <li>
          <a href="/about">
            <FaInfoCircle />
            {!isCollapsed && <span>About</span>}
          </a>
        </li>
        <li>
          <a href="/services">
            <FaServicestack />
            {!isCollapsed && <span>Services</span>}
          </a>
        </li>
        <li>
          <a href="/contact">
            <FaEnvelope />
            {!isCollapsed && <span>Contact</span>}
          </a>
        </li>
      </ul>
      {!isCollapsed && (
        <button className="menu-button" onClick={toggleNavBar}>
          <FaTimes />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
