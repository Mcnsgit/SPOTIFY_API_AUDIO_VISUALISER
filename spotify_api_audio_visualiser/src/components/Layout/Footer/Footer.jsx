// src/components/Layout/Footer/Footer.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Player from "../../MainSection/Player/Player";
import { fetchUserProfile } from "../../../api/spotify";
import axios from '../../../utils/axios';

import Volume from '../../MainSection/Player/volume/Volume';
import PlayerControls from '../../MainSection/Player/playerControls/tracksControl';
import DetailSection from '../../MainSection/Player/Details/detailSection';
import TrackSider from '../../MainSection/Player/Controls/progressBar';
import { useSpotifyAuth } from "../../../hooks/SpotifyAuthProvider";

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

const Footer = ({ ...props}) => {

  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);


  return (
    <FooterContainer>
      <Player  />
      <DetailSection track={currentTrack} />
      <PlayerControls />
      <TrackSider tracks={tracks} currentTrack={currentTrack} onSelect={setCurrentTrack} />
      <Volume />
    </FooterContainer>
  );
};

export default Footer;