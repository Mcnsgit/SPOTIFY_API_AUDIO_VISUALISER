// // src/components/main/Player/playerControls/tracksControl.jsx
import React from 'react';
// // import './PlayerControls.scss';
import Button from '../Controls/controlButon';
import styled from 'styled-components';
// const ControlsContainer = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;

// //   Button {
// //     background: none;
// //     border: none;
// //     color: #fff;
// //     font-size: 20px;
// //     cursor: pointer;

// //     &:hover {
// //       color: #1db954;
// //     }
// //   }
// // `;
const tracksControl= props => (
  <div className="track-control">
    
    <Button
      onClick={() => props.shuffle(!props.shuffleActive)}
      className={'shuffle-track' + (props.shuffleActive ? ' active' : '')}
      icon="fa-random"
      />
    <Button
      className="back-track"
      icon="fa-step-backward reverse"
      onClick={props.previousTrack}
      />
    <Button
      className="play-btn"
      onClick={props.playing ? props.pauseTrack : props.playTrack}
      icon={
        'play-btn ' + (props.playing ? 'fa-pause-circle-o' : 'fa-play-circle-o')
      }
      playBtn
      />
    <Button
      className="next-track"
      icon="fa-step-forward forward"
      onClick={props.nextTrack}
      />
    <Button
      onClick={() =>
        props.repeatContext(props.repeatActive ? 'off' : 'context')
      }
      className={'repeat-track' + (props.repeatActive ? ' active' : '')}
      icon="fa-retweet"
      />
      
  </div>
);

export default tracksControl;

// import {
//   IoPlayBackSharp,
//   IoPlayForwardSharp,
//   IoPlaySkipBackSharp,
//   IoPlaySkipForwardSharp,
//   IoPlaySharp,
//   IoPauseSharp,
// } from 'react-icons/io5';

// // import {
// //   IoMdVolumeHigh,
// //   IoMdVolumeOff,
// //   IoMdVolumeLow,
// // } from 'react-icons/io';

// import styled from 'styled-components';
// import propTypes from 'prop-types';

// const ControlsContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;

//   Button {
//     background: none;
//     border: none;
//     color: #fff;
//     font-size: 20px;
//     cursor: pointer;

//     &:hover {
//       color: #1db954;
//     }
//   }
// `;

// const TracksControl = ({
//   audioRef,
//   duration,
//   setTimeProgress,
//   progressBarRef,
//   trackIndex,
//   setTrackIndex,
//   fetchTracks,
//   setCurrentTrack,
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const playAnimationRef = useRef();

//   const togglePlayPause = () => {
//       setIsPlaying((prev) => !prev);
//   };

//   const repeat = useCallback(() => {
//       if (audioRef.current) {
//           const currentTime = audioRef.current.currentTime;
//           setTimeProgress(currentTime);
//           progressBarRef.current.value = currentTime;
//           progressBarRef.current.style.setProperty(
//               '--range-progress',
//               `${(progressBarRef.current.value / duration) * 100}%`
//           );

//           playAnimationRef.current = requestAnimationFrame(repeat);
//       }
//   }, [audioRef, duration, progressBarRef, setTimeProgress]);

//   useEffect(() => {
//       if (isPlaying && audioRef.current) {
//           audioRef.current.play();
//       } else if (!isPlaying && audioRef.current) {
//           audioRef.current.pause();
//       }
//       playAnimationRef.current = requestAnimationFrame(repeat);
//   }, [isPlaying, audioRef, repeat]);

//   const skipForward = () => {
//       if (audioRef.current) {
//           audioRef.current.currentTime += 15;
//       }
//   };

//   const skipBackward = () => {
//       if (audioRef.current) {
//           audioRef.current.currentTime -= 15;
//       }
//   };

//   const handlePrevious = () => {
//       const newTrackIndex = (trackIndex + fetchTracks.length - 1) % fetchTracks.length;
//       setTrackIndex(newTrackIndex);
//       setCurrentTrack(fetchTracks[newTrackIndex]);
//   };

//   const handleNext = () => {
//       const newTrackIndex = (trackIndex + 1) % fetchTracks.length;
//       setTrackIndex(newTrackIndex);
//       setCurrentTrack(fetchTracks[newTrackIndex]);
//   };

//   return (
//       <ControlsContainer>
//           <Button onClick={handlePrevious}>
//               <IoPlaySkipBackSharp />
//           </Button>
//           <Button onClick={skipBackward}>
//               <IoPlayBackSharp />
//           </Button>
//           <Button onClick={togglePlayPause}>
//               {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
//           </Button>
//           <Button onClick={skipForward}>
//               <IoPlayForwardSharp />
//           </Button>
//           <Button onClick={handleNext}>
//               <IoPlaySkipForwardSharp />
//           </Button>
//       </ControlsContainer>
//   );
// };
// src/components/main/Player/playerControls/tracksControl.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   IoPlayBackSharp,
//   IoPlayForwardSharp,
//   IoPlaySkipBackSharp,
//   IoPlaySkipForwardSharp,
//   IoPlaySharp,
//   IoPauseSharp,
// } from 'react-icons/io5';
// import styled from 'styled-components';
// import SpotifyWebApi from 'spotify-web-api-js'
// import Button from '../Controls/controlButon';
// const ControlsContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;

//   Button {
//     background: none;
//     border: none;
//     color: #fff;
//     font-size: 20px;
//     cursor: pointer;

//     &:hover {
//       color: #1db954;
//     }
//   }
// `;

// const spotifyApi = new SpotifyWebApi();
// const TracksControl = ({
//   audioRef,
//   duration,
//   setTimeProgress,
//   progressBarRef,
//   trackIndex,
//   setTrackIndex,
//   fetchTracks,
//   setCurrentTrack,
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);


//   useEffect(() => {
//     // Fetch the current playback state
//     spotifyApi.getMyCurrentPlaybackState().then((response) => {
//       setIsPlaying(response.is_playing);
//       setCurrentTrack(response.item);
//     });
//   }, []);

//   const handlePlay = () => {
//     // Start playback
//     spotifyApi.play();
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     // Pause playback
//     spotifyApi.pause();
//     setIsPlaying(false);
//   };

//   const skipForward = () => {
//     if (audioRef.current) {
//       spotifyApi.seek(audioRef.current.currentTime + 15);

//     }
//   };

//   const skipBackward = () => {
//     if (audioRef.current) {
//       spotifyApi.seek(audioRef.current.currentTime - 15);

//     }
//   };

//   const handlePrevious = () => {
//     const newTrackIndex = (trackIndex + fetchTracks.length - 1) % fetchTracks.length;
//     setTrackIndex(newTrackIndex);
//     setCurrentTrack(fetchTracks[newTrackIndex]);
//   };

//   const handleNext = () => {
//     const newTrackIndex = (trackIndex + 1) % fetchTracks.length;
//     setTrackIndex(newTrackIndex);
//     setCurrentTrack(fetchTracks[newTrackIndex]);
//   };

//   useEffect(() => {
//     if (isPlaying && audioRef.current) {
//       audioRef.current.play();
//     } else if (!isPlaying && audioRef.current) {
//       audioRef.current.pause();
//     }
//   }, [isPlaying, audioRef]);

//   return (
//     <ControlsContainer>
//        <Button
//       onClick={() => props.shuffle(!props.shuffleActive)}
//       className={'shuffle-track' + (props.shuffleActive ? ' active' : '')}
//       icon="fa-random"
//     />
//       <Button onClick={handlePrevious}>
//         <IoPlaySkipBackSharp />
//       </Button>
//       <Button onClick={skipBackward}>
//         <IoPlayBackSharp />
//       </Button>
//         {isPlaying ? ( 
//           <Button onClick={handlePause}> <IoPauseSharp /> </Button> 
//           ) : (
//           <Button onClick={handlePlay}> <IoPlaySharp /> </Button>
//           )}
//       <Button onClick={skipForward}>
//         <IoPlayForwardSharp />
//       </Button>
//       <Button onClick={handleNext}>
//         <IoPlaySkipForwardSharp />
//       </Button>
//     </ControlsContainer>
//   );
// };
// export default TracksControl;