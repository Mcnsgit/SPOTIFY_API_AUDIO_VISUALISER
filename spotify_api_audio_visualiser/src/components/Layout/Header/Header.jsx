import React from "react";
import propTypes from 'prop-types';
import "./Header.scss";
import UserDetails from "./userDetails/userDetails";
import TrackSearch from "./trackSearch/trackSearch";
import styled from "styled-components";

const HeaderContainer = styled.div`
     position: fixed;
  z-index: 1000;
  display: flex;
  height: 50px;
  margin: auto;
  right: 0;
  left: 0;
  justify-content: space-between;
  background: rgb(24, 24, 24);
  width: 1300px;
`;

const HeaderTitleStyle = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 20px 5px 20px;
`;

const SearchStyles = styled.div`
    display: flex;
    flex- direction: row; 
    align-items: space-between;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const Header = ({ username, img }) => {
    return (
        <HeaderContainer>
            <HeaderTitleStyle>
                <h1>Spotify Visualizer</h1>
            </HeaderTitleStyle>
            <SearchStyles>
                <TrackSearch />
            </SearchStyles>
            <UserDetails username={username} img={img} />
        </HeaderContainer>
    );
}

Header.propTypes = {
    username: propTypes.string,
    img: propTypes.object,
}

export default Header;