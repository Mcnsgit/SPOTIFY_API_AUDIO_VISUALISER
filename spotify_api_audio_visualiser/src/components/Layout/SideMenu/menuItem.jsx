// src/components/layoutComponents/SideMenu/menuItem.jsx
import React from "react";
import PropTypes from "prop-types";
import "./SideMenu.scss";

const MenuItem = ({ title, active, onClick }) => (
	<li className={`menu-item ${active ? "active" : ""}`} onClick={onClick}>
		{title}
	</li>
);

MenuItem.propTypes = {
	title: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};

export default MenuItem;
