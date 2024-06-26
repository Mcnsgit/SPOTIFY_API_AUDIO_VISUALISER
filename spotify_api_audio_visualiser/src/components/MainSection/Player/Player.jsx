// src/components/main/Player/Player.jsx
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
// import './Player.scss';
import ProgressBar from './Controls/trackSider';
import DetailSection from './Details/detailSection';
import TracksControl from './playerControls/tracksControl';
import withSpotifyPlayer from '../../../hoc/playerHoc';
import VolumeControl from './volume/Volume';
import ExtraControls from './extraControls/ExtraControls';
const toSeconds = (ms) => ms / 1000;
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
    const [timeProgress, setTimeProgress] =useState(0);
    const audioRef = useRef();
    const currentTrack = useSelector(state => state.currentTrack);

    useEffect(() => {
      if (currentTrack) {
        audioRef.current.src = currentTrack.preview_url; // Using preview URL for demonstration
        audioRef.current.play();
      }
    }, [currentTrack]);
  
    const duration = currentTrack ? toSeconds(currentTrack.duration_ms) : 1;
    
    return (
      <PlayerContainer>
        <TrackCoverStyles>  
          {currentTrack && <DetailSection currentTrack={currentTrack} />}
        </TrackCoverStyles>
        <PlayerControls>
          <TracksControl currentTrack={currentTrack} />
        </PlayerControls>
        <PlayerProgressBar>
          <ProgressBar
            audioRef={audioRef}
            duration={duration}
            timeProgress={timeProgress}
          />
        </PlayerProgressBar>
<PlayerExtraButtons>
            <VolumeControl />
          <ExtraControls />
  </PlayerExtraButtons>
    </PlayerContainer>
    );
  };
  
  export default withSpotifyPlayer(Player);

  
 
  // const [trackIndex, setTrackIndex] = useState(0);
  // const [timeProgress, setTimeProgress] = useState(0);
  // const [duration, setDuration] = useState(0);

  // const audioRef = useRef();
  // const progressBarRef = useRef();
  // const token = useSelector(state => state.sessionReducer.token);
  // const tracks = useSelector(state => state.libraryReducer.tracks);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (tracks.length === 0) {
  //     dispatch(fetchTracks());
  //   }
  // }, [dispatch, tracks]);

  // useEffect(() => {
  //   if (tracks.length > 0 && !currentTrack) {
  //     setTrackIndex(0);
  //     playTrack(tracks[0]);
  //   }
  // }, [tracks, currentTrack, playTrack]);

  // const handleNext = () => {
  //   if (trackIndex >= tracks.length - 1) {
  //     setTrackIndex(0);
  //     playTrack(tracks[0]);
  //   } else {
  //     setTrackIndex((prev) => prev + 1);
  //     playTrack(tracks[trackIndex + 1]);
  //   }
  // };

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.onloadedmetadata = () => {
  //       setDuration(audioRef.current.duration);
  //     };
  //     audioRef.current.ontimeupdate = () => {
  //       setTimeProgress(audioRef.current.currentTime);
  //     };
  //   }
  // }, [audioRef]);

