import React from "react";
import propTypes from 'prop-types';
import "./Header.scss";
import UserDetails from "./userDetails/userDetails";

const Header = ({ username, img }) => {
    return (
        <div className="header flex-shrink-0">
            <h1>Spotify Visualizer</h1>
            <UserDetails username={username} img={img} />
        </div>
    );
}

Header.PropTypes = {
    username: propTypes.string,
    img: propTypes.object,
}

export default Header;