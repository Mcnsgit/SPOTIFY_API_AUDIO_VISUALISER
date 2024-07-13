import React from "react";

import "../Header.scss";

const header = props => (
	<div className="details-container">
		<p className="username">{props.username}</p>
		<img alt="user" className="user-image" src={props.img} />
	</div>
);

export default header;
