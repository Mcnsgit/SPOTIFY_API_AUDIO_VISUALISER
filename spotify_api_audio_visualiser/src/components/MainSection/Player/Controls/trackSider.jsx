import React, { useMemo, useState, useEffect, useCallback } from "react";
// import PropTypes from 'prop-types';
import styled from "styled-components";
// import '../trackSider.scss';
// import {formatDuration} from '../../../helpers/format'
const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;

  time {
    align-self: flex-start;
    color: #fff;
    font-size: 12px;
  }

  input[type='range'] {
    width: 80%;
    background: #535353;
    left: 50px;
    border-radius: 4px;
    appearance: none;
    outline: none;
    &::-webkit-slider-thumb {
      appearance: none;
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
    &::-moz-range-thumb {
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }) => {
  const handleProgressChange = (e) => {
    if (audioRef.current) {
      const newTime = parseInt(e.target.value);
      audioRef.current.currentTime = newTime;
    }
  };
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="progress">
      <span className="time current">{formatTime(timeProgress)}</span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
//   const [played, setPlayed] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playerReady, setPlayerReady] = useState(false); // Flag for player availability

//   const handleProgress = useCallback(
//     (state) => {
//       if (playerReady) { // Check player availability before updating state
//         setPlayed(state.played);
//       }
//     },
//     [playerReady, setPlayed]
//   );
  
//     const handleError = (error) => {
//       player.seek(0);
//       setPlayed(0);
//       setDuration(0);
//       setPlayerReady(false);
//       console.error('Error in player:', error);
  
//       // Implement additional error handling logic here (e.g., display error message)
//     };

//   const handleDuration = useCallback(
//     (duration) => {
//       if (playerReady) { // Check player availability before updating state
//         setDuration(duration);
//       }
//     },
//     [playerReady, setDuration]
//   );

//   // Use useMemo to optimize expensive time formatting calculation
//   const formattedPlayedTime = useMemo(() => formatDuration(played * duration), [played, duration, formatDuration]);
//   const formattedDurationTime = useMemo(() => formatDuration(duration), [duration, formatDuration]);

//   useEffect(() => {
//     if (player) {
//       setPlayerReady(true); // Set player availability flag
//       player.on('progress', handleProgress);
//       player.on('duration', handleDuration);
//       player.on('error', handleError); // Add error listener
//     }
//     return () => {
//       if (player) {
//         player.off('progress', handleProgress);
//         player.off('duration', handleDuration);
//         player.off('error', handleError);
//       }
//     };
//   }, [player, handleProgress, handleDuration, handleError]);

//   const handleSeekChange = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const seekTime = (e.nativeEvent.clientX - rect.left) / rect.width;
//     onSeek(seekTime * duration);
//   };

//   // const formatTime = (seconds) => {
//   //   const mins = Math.floor(seconds / 60);
//   //   const secs = Math.floor(seconds % 60);
//   //   return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   // };

//   return (
//     <div className="track-sider-container">
//       <FormattedTime>{formattedPlayedTime}</FormattedTime>
//       <ProgressContainer
//         className="progress-container"
//         onClick={handleSeekChange}
//       >
//         <progress className="progress" value={played * duration} max={duration} />
//       </ProgressContainer>
//       <FormattedTime>{formattedDurationTime}</FormattedTime>
//     </div>
//   );
// };

// ProgressBar.propTypes = {
//   player: PropTypes.object.isRequired,
//   onSeek: PropTypes.func.isRequired,
// };

// const ProgressContainer = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   padding: 10px;
//   cursor: pointer;
// `;

// const FormattedTime = styled.span`
//   color: #b3b3b3;
//   font-size: 12px;
// `;

// export default ProgressBar;