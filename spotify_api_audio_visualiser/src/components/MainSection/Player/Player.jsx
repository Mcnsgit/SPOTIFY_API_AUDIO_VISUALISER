// src/components/main/Player/Player.jsx
import React, { Component,useState, useEffect,useRef } from "react";
import useAudioContext from './Visualiser/Visuals/useAudioContext';
import './Visualiser/Visuals/AudioControls.scss';
import Button from './Controls/controlButon';
import styled from "styled-components";
import propTypes from 'prop-types';

import PlayerHoc from "../../../hoc/playerHoc";
import './Player.scss';
import { connect } from 'react-redux';
import { playTrack, pauseTrack, nextTrack, previousTrack, seekTrack } from '../../../redux/actions/playerActions';
import { getAudioApiFeatures } from '../../../api/spotify';
import { useSpotifyAuth } from '../../../hooks/SpotifyAuthProvider';
import './Details/detailsSection.scss'; 
import withUiActions from '../../../hoc/uiHoc';
import withStatus from '../../../hoc/statusHoc';
import AudioControls from "./Visualiser/Visuals/AudioControls";
import VolumeControl from "./volume/Volume";
import ExtraControls from "./extraControls/ExtraControls";
import './Player.scss'
import { BsMusicNoteBeamed } from 'react-icons/bs';


const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background: #282828;
  color: white;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TrackDetails = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const Player = ({     
      currentTrack, 
      isPlaying, 
      playTrack,
      pauseTrack,
      nextTrack,
      previousTrack
    }) => {
      if (!currentTrack) {
        return <div>No track is currently playing</div>;
      }


  const { audioRef, seekTrack, trackPosition, playing } = useAudioContext({ currentTrack });
  const { token } = useSpotifyAuth();
  const progressBarRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);

  useEffect(() => {
    console.log("Current Track:", currentTrack);
    console.log("Track Position:", trackPosition);
    console.log("Playing:", playing);
    
    if (currentTrack) {
      setDuration(currentTrack.duration_ms / 1000);
    }
  }, [currentTrack, trackPosition, playing]);

  useEffect(() => {
    setTimeProgress(trackPosition / 1000);
  }, [trackPosition]);

  const handleProgressChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setTimeProgress(newTime);
    seekTrack(newTime * 1000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getSmallestAlbumImage = (images) => {
    if (!images || images.length === 0) return '';
    return images.reduce((smallest, image) => image.height < smallest.height ? image : smallest, images[0]).url;
  };

  const albumImageUrl = currentTrack?.album?.images ? getSmallestAlbumImage(currentTrack.album.images) : '';


  return (
    <PlayerContainer>
    <div className="player">
      <img src={currentTrack.album?.images[0]?.url} alt="Album Art" />
      <div>
        <h3>{currentTrack.name}</h3>
        <p>{currentTrack.artists?.map(artist => artist.name).join(', ')}</p>
      </div>
      <AudioControls 
        isPlaying={isPlaying}
        onPlay={playTrack}
        onPause={pauseTrack}
        onNext={nextTrack}
        onPrevious={previousTrack}
      />
    </div>           
      <ProgressWrapper>
        <div className="progress">
          <span className="time current">{formatTime(timeProgress)}</span>
          <input
            type="range"
            ref={progressBarRef}
            value={timeProgress}
            min="0"
            max={duration}
            onChange={handleProgressChange}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </ProgressWrapper>
      <VolumeControl audioRef={spotifyPlayer} />
    </PlayerContainer>
  );
};

Player.PropTypes = {
  currentTrack: propTypes.object
};

const mapStateToProps = state => ({
  currentTrack: state.player.currentTrack,
  isPlaying: state.player.isPlaying,
  trackPosition: state.player.trackPosition,
  spotifyPlayer: state.player.spotifyPlayer,
});

const mapDispatchToProps = {
  playTrack,
  pauseTrack,
  nextTrack,
  previousTrack,
  seekTrack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);