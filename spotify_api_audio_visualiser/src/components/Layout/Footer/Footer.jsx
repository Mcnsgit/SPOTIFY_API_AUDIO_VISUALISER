// src/components/Layout/Footer/Footer.jsx
import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Player from "../../MainSection/Player/Player";

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
  justify-content: center;
`;
const Footer = ({ player }) => {
  // Check if player state exists and has a currentTrack
  const hasTrack = player && player.currentTrack;

  return (
    <FooterContainer>
      {hasTrack ? (
        <Player />
      ) : (
        <div>No track currently playing</div>
      )}
    </FooterContainer>
  );
};

const mapStateToProps = (state) => ({
  player: state.player, // Assuming your player reducer is named 'player'
});

export default connect(mapStateToProps)(Footer);