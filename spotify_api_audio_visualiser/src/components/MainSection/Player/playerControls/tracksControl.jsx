// src/components/main/Player/playerControls/tracksControl.jsx
import React,{ useState, useEffect, useCallback, useRef} from 'react';
// import './PlayerControls.scss';
// import Button from '../Controls/controlButon';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

// import {
//   IoMdVolumeHigh,
//   IoMdVolumeOff,
//   IoMdVolumeLow,
// } from 'react-icons/io';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: #1db954;
    }
  }
`;

const TracksControl = ({
  audioRef,
  duration,
  setTimeProgress,
  progressBarRef,
  trackIndex,
  setTrackIndex,
  fetchTracks,
  setCurrentTrack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState(60);
  // const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
  const currentTime = audioRef.current.currentTime;
  setTimeProgress(currentTime);
  progressBarRef.current.value = currentTime;
  progressBarRef.current.style.setProperty(
    '--range-progress',
    `${(progressBarRef.current.value / duration) * 100}%`
  );

  playAnimationRef.current = requestAnimationFrame(repeat);
}, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };

 
  // const handlePrevious = () => {
  //   if (trackIndex === 0) {
  //     let lastTrackIndex = fetchTracks.length - 1;
  //     setTrackIndex(lastTrackIndex);
  //     setCurrentTrack(fetchTracks[lastTrackIndex]);
  //   } else {
  //     setTrackIndex((prev) => prev - 1);
  //     setCurrentTrack(fetchTracks[trackIndex - 1]);
  //   }
  // };

  const handlePrevious = () => {
    const newTrackIndex = (trackIndex + fetchTracks.length - 1) % fetchTracks.length;
    setTrackIndex(newTrackIndex);
    setCurrentTrack(fetchTracks[newTrackIndex]);
  };

  const handleNext = () => {
    const newTrackIndex = (trackIndex + 1) % fetchTracks.length;
    setTrackIndex(newTrackIndex);
    setCurrentTrack(fetchTracks[newTrackIndex]);
  };

  // useEffect(() => {
  //   if (audioRef) {
  //     audioRef.current.volume = volume / 100;
  //     audioRef.current.muted = muteVolume;
  //   }
  // }, [volume, audioRef, muteVolume]);

  return (
    <ControlsContainer>
      <button onClick={handlePrevious}>
        <IoPlaySkipBackSharp />
      </button>
      <button onClick={skipBackward}>
        <IoPlayBackSharp />
      </button>
      <button onClick={togglePlayPause}>
        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
      </button>
      <button onClick={skipForward}>
        <IoPlayForwardSharp />
      </button>
      <button onClick={handleNext}>
        <IoPlaySkipForwardSharp />
      </button>
    </ControlsContainer>
  );
};
      // <div className="volume">
      //   <button onClick={() => setMuteVolume((prev) => !prev)}>
      //     {muteVolume || volume < 5 ? (
      //       <IoMdVolumeOff />
      //     ) : volume < 40 ? (
      //       <IoMdVolumeLow />
      //     ) : (
      //       <IoMdVolumeHigh />
      //     )}
      //   </button>
      //   <input
      //     type="range"
      //     min={0}
      //     max={100}
      //     value={volume}
      //     onChange={(e) => setVolume(e.target.value)}
      //     style={{
      //       background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
      //     }}
      //   />
      // </div>

// TracksControl.propTypes = {
//   audioRef: PropTypes.object.isRequired,
//   currentTrack: PropTypes.object,
//   onPlayPause: PropTypes.func.isRequired,
//   onNextTrack: PropTypes.func.isRequired,
//   onPreviousTrack: PropTypes.func.isRequired,
// };

export default TracksControl;
