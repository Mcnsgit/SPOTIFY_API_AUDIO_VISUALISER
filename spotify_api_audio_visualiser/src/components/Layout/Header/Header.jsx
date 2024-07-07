import React from "react";
import PropTypes from 'prop-types';
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

Header.propTypes = {
    username: PropTypes.string,
    img: PropTypes.object,
}

export default Header;