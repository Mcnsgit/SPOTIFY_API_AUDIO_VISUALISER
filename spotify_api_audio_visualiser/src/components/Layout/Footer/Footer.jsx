// src/components/Layout/Footer/Footer.jsx
import React from "react";
// import TrackCover from "../SideMenu/trackCover/trackCover";
import styled from "styled-components";
import Player from "../../MainSection/Player/Player";
// import "./Footer.scss";

const FooterContainer = styled.footer`
  position: fixed;
  width: 100%;
  height: 100px;
  bottom: 0;
  left: 0;
  background: rgb(40, 40, 40);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Footer = () => (
  <FooterContainer>
    <div className="track-cover">
    
    </div>
    <div className="player">
      <Player />
    </div>
  </FooterContainer>
);

export default Footer;
