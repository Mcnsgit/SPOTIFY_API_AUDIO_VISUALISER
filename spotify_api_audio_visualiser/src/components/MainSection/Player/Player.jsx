// src/components/main/Player/Player.jsx
import React, { Component, useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import { connect } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
// import PropTypes from 'prop-types'
// import './Player.scss';
import ProgressBar from "./Controls/trackSider";
import DetailSection from "./Details/detailSection";
import TracksControl from "./playerControls/tracksControl";
import VolumeControl from "./volume/Volume";
import ExtraControls from "./extraControls/ExtraControls";


import PlayerHoc from "../../../hoc/playerHoc";
import { fetchTracks } from "../../../redux/actions/libraryActions";
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

const Player = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(fetchTracks[trackIndex]);
  const [volume, setVolume] = useState(50); // Default volume level
  const [muteVolume, setMuteVolume] = useState(false); // Muted state 

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () =>{
    if (trackIndex >= fetchTracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(fetchTracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(fetchTracks[trackIndex +1]);
    }
  };
  

  return (
    <PlayerContainer>
      <TrackCoverStyles>
        <DetailSection 
        {...{
          currentTrack,
          audioRef,
          setDuration,
          progressBarRef,
          handleNext,
        }}
                />
      </TrackCoverStyles>
      <PlayerControls>
        <TracksControl{...{
          audioRef,
          fetchTracks,
          trackIndex,
          setTrackIndex,
          setCurrentTrack,
          duration,
          setTimeProgress,
          progressBarRef,
          handleNext,
        }}
          />
      </PlayerControls>
      <PlayerProgressBar>
        <ProgressBar
           {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </PlayerProgressBar>
       <PlayerExtraButtons>
       <VolumeControl  {...{ audioRef, volume, muteVolume}} /> 
      </PlayerExtraButtons>
    </PlayerContainer>
  );
};

export default PlayerHoc(Player);

/* <ExtraControls shuffleActive={shuffle} repeatActive={repeatContext} /> */
// Player.propTypes = {
//   currentTrack: PropTypes.object.isRequired,
//   isPlaying: PropTypes.bool,
//   nextTrack: PropTypes.func.isRequired,
//   previousTrack: PropTypes.func.isRequired,
//   pauseTrack: PropTypes.func.isRequired,
//   playTrack: PropTypes.func.isRequired,
//   seekTrack: PropTypes.func,
//   shuffle: PropTypes.func.isRequired,
//   repeatContext: PropTypes.func.isRequired,
//   setVolume: PropTypes.func.isRequired
// };



