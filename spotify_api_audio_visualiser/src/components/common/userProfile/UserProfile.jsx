// src/components/reusable/UserProfile.jsx
import React from "react";
import propTypes from "prop-types";

import "./UserProfile.css";

const UserProfile = ({ userProfile }) => {
	if (!userProfile || !userProfile.imageUrl) {
		return null; // Return early if userProfile or imageUrl is undefined
	}

	return (
		<div className="user-profile">
			<img src={userProfile.imageUrl} alt="User" />
			<span>{userProfile.name || "Guest"}</span>
			<div className="dropdown">
				<a href={userProfile.profileUrl || "#"}>Profile</a>
				<a href="/logout">Logout</a>
			</div>
		</div>
	);
};

UserProfile.PropTypes = {
	userProfile: propTypes.shape({
		name: propTypes.string.isRequired,
		imageUrl: propTypes.string,
		profileUrl: propTypes.string.isRequired,
	}),
};

export default UserProfile;