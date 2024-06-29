// Rewritten code to fix performance issues
import React,{ Component } from "react";
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
// import TrackSearch from "../../trackSearch/trackSearch";
// import PropTypes from 'prop-types';
// import UserProfile from '../userProfile/UserProfile';
import "./Header.scss";
import UserDetails from "./userDetails/userDetails";
{/* <TrackSearch /> */}

class Header extends Component {
	render() {
		return (
			<div className="header flex-shrink-0">
				<h1>Spotify Visualizer</h1>
				<UserDetails username={this.props.username} img={this.props.img} />
			</div>
		);
	}
}
Header.PropTypes = {
	username: PropTypes.string,
	img: PropTypes.object,
}


export default Header;
