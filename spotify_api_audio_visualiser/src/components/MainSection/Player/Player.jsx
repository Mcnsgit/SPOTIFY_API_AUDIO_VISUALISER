// src/components/main/Player/Player.jsx
import React, { Component, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types'
// import './Player.scss';
import ProgressBar from "./Controls/trackSider";
import DetailSection from "./Details/detailSection";
import TracksControl from "./playerControls/tracksControl";
import VolumeControl from "./volume/Volume";
import ExtraControls from "./extraControls/ExtraControls";
import { nextTrack, pauseTrack, playTrack, previousTrack } from "../../../redux/actions/playerActions";
const PlayerContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 100px;
background: #282828;
padding: 0 20px;
`;

const TrackCoverStyles = styled.div`
display: flex;
align-items: center;
flex-shrink: 0;
`;

const PlayerControls = styled.div`
display: flex;
align-items: center;
gap: 20px;
`;

const PlayerProgressBar = styled.div`
flex: 1;
margin: 0 20px;
`;

const PlayerExtraButtons = styled.div`
display: flex;
align-items: center;
gap: 20px;
flex-shrink: 0;
`;

const Player = ({
  currentTrack,
  isPlaying,
  volume,
  onPlayPause,
  onNextTrack,
  onPreviousTrack,
  onVolumeChange,
}) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const audioRef = useRef();
  const position = timeProgress;
  const duration = currentTrack ? currentTrack.duration_ms : 1;

  return (
<PlayerContainer>
  <TrackCoverStyles>
    <DetailSection currentTrack={currentTrack} />
  </TrackCoverStyles>
  <PlayerControls>
    <TracksControl {...{ currentTrack, isPlaying, onPlayPause, onNextTrack, onPreviousTrack }}/>
  </PlayerControls>
  <PlayerProgressBar>
    <ProgressBar
      audioRef={audioRef}
      timeProgress={timeProgress}
      duration={duration}
      setTimeProgress={setTimeProgress}
    />
  </PlayerProgressBar>
  <PlayerExtraButtons>
    <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
    <ExtraControls isPlaying={isPlaying} onPlayPause={onPlayPause} />
  </PlayerExtraButtons>
</PlayerContainer>
);
};

Player.propTypes = {
  currentTrack: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onNextTrack: PropTypes.func.isRequired,
  onPreviousTrack: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired
};

export default Player;

