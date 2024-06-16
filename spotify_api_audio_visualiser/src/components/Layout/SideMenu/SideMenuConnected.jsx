// src/components/layoutComponents/SideMenu/SideMenuConnected.jsx
import React from 'react';
import PropTypes from 'prop-types';

const SideMenuConnected = ({ title, active, onClick }) => (
  <li className={`side-menu-item ${active ? 'active' : ''}`} onClick={onClick}>
    {title}
  </li>
);

SideMenuConnected.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SideMenuConnected;
