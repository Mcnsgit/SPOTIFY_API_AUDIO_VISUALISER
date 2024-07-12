// src/components/layoutComponents/SideMenu/SideMenuConnected.jsx
import React from "react";
import propTypes from "prop-types";

const SideMenuConnected = ({ title, active, onClick }) => (
	<li className={`side-menu-item ${active ? "active" : ""}`} onClick={onClick}>
		{title}
	</li>
);

SideMenuConnected.propTypes = {
	title: propTypes.string.isRequired,
	active: propTypes.bool.isRequired,
	onClick: propTypes.func.isRequired,
};

export default SideMenuConnected;
