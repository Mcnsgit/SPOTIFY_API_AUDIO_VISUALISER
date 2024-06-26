// src/components/main/Player/playerControls/tracksControl.jsx
import React from 'react';
// import './PlayerControls.scss';
import Button from '../Controls/controlButon';
import styled from 'styled-components';

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

const TracksControl = props => (
<ControlsContainer>

    <Button className="back-song"
      icon="fa-step-backward reverse"
      onClick={props.previousSong}/>
    <Button 
      className="play-btn"
      onClick={props.playing ? props.pauseSong : props.playSong}
      icon={
        'play-btn ' + (props.playing ? 'fa-pause-circle-o' : 'fa-play-circle-o')
      }
      playBtn/>
    <Button  className="next-song"
      icon="fa-step-forward forward"
      onClick={props.nextSong}/>

  </ControlsContainer>
);

export default TracksControl;

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import Button from '../Controls/controlButon';
// import './PlayerControls.scss';
// import {
//   IoPlayBackSharp,
//   IoPlayForwardSharp,
//   IoPlaySkipBackSharp,
//   IoPlaySkipForwardSharp,
//   IoPlaySharp,
//   IoPauseSharp,

// } from 'react-icons/io5';
// import {
//   IoMdVolumeHigh,
//   IoMdVolumeOff,
//   IoMdVolumeLow,
// } from 'react-icons/io';
// import '../Player.scss'
// const tracksControl = (props) => {
//   <div className="tracks-control-container">
//     <Button
//       className="back-track"
//       icon="fa-step-backward reverse"
//       onClick={props.previousTrack}
//     />
//     <Button
//     className="Skip-backward-track"
//     icon="IoPlaySkipBackSharp"
//     onClick={() => props.skipBackward()}
//     />
//     <Button
//       className="play-btn"
//       onClick={props.playing ? 
//         props.pauseTrack : props.playTrack}
//       icon={
//         'play-btn ' + (props.playing ? 'fa-pause-circle-o' : 
//           'fa-play-circle-o')
//       }
//       playBtn
//     />
//     <Button
//       className="skip-track-forward"
//          onClick={() => props.skipForward()}
//       icon="IoPlaySkipForwardSharp"
//     />
//     <Button
//       className="next-track"
//       icon="fa-step-forward forward"
//       onClick={props.nextTrack}
//     />
//    </div>
// };
// // const Controls = ({
// //   audioRef,
// //   progressBarRef,
   
// //   duration,
// //   setTimePogress,
// //   playing,
// // }) => {
// //   const [repeatMode, setRepeatMode] = useState('no-repeat'); // 'no-repeat', 'repeat-one', 'repeat-all'
// //   const [volume, setVolume] = useState(60);
// //   const [muteVolume, setMuteVolume] = useState(false);
// //   const playAnimationRef = useRef();

// //   const updateProgress = useCallback(() => {
// //     if (audioRef?.current) {
// //       const currentTime = audioRef.current.currentTime;
// //       setTimePogress(currentTime);
// //       progressBarRef.current.value = currentTime;
// //       progressBarRef.current.style.setProperty(
// //         '--range-progress',
// //         `${(progressBarRef.current.value / duration) * 100}%`
// //       );

// //       playAnimationRef.current = requestAnimationFrame(updateProgress);
// //     }
// //   }, [audioRef, duration, progressBarRef, setTimePogress]);

// //   useEffect(() => {
// //     if (playing) {
// //       audioRef?.current?.play();
// //       playAnimationRef.current = requestAnimationFrame(updateProgress);
// //     } else {
// //       audioRef?.current?.pause();
// //       cancelAnimationFrame(playAnimationRef.current);
// //     }
// //   }, [playing, audioRef, updateProgress]);

// //   // const togglePlayPause = () => {
// //   //   if (playing) {
// //   //     pauseTrack();
// //   //   } else {
// //   //     playTrack();
// //   //   }
// //   // };
// //   const skipForward = () => {
// //     if (audioRef?.current) {
// //       audioRef.current.currentTime += 15;
// //     }
// //   };

// //   const skipBackward = () => {
// //     if (audioRef?.current) {
// //       audioRef.current.currentTime -= 15;
// //     }
// //   };

// // // const handlePrevious = () => {
// // //   if (trackIndex === 0) {
// // //     const lastTrackIndex = tracks.length - 1;
// // //     setTrackIndex(lastTrackIndex);
// // //     setCurrentTrack(tracks[lastTrackIndex]); 
// // //   } else {
// // //     setTrackIndex((prev) => prev - 1);
// // //     setCurrentTrack(tracks[trackIndex - 1]);
// // //   }
// // // };

// // // const handleNext = () => {
// // //   if (trackIndex >= tracks.length - 1) {
// // //     setTrackIndex(0);
// // //     setCurrentTrack(tracks[0]);
// // //   } else {
// // //     setTrackIndex((prev) => prev + 1);
// // //     setCurrentTrack(tracks[trackIndex + 1]);
// // //   }
// // // };

// // const handleVolumeChange = (e) => {
// //   const rect = e.currentTarget.getBoundingClientRect();
// //   const newVolume = (e.clientX - rect.left) / rect.width;
// //   setVolume(newVolume);
// //   if (audioRef?.current) {
// //     audioRef.current.volume = newVolume;
// //   }
// // };
  

// // useEffect(() => {
// //   if(audioRef?.current){ 
// //     audioRef.current.volume = volume / 100;
// //     audioRef.current.muted = muteVolume;
// //   }
// // },[volume,audioRef,muteVolume]);

// // const shuffle = () => {
// //   const s = props.trackList.tracks.slice();
// //   let j, i = s.length - 1;
// //   for (i; i > 0; i -= 1) {
// //     j = Math.floor(Math.random() * (i + 1));
// //     [s[i], s[j]] = [s[j], s[i]];
// //   }
// //   setShuffledTracks(s); 
// //   };        


// // const handleRepeatMode = () => {
// //   if (repeatMode === 'no-repeat') {
// //     setRepeatMode('repeat-one');
// //     repeatContext('track');
// //   } else if (repeatMode === 'repeat-one') {
// //     setRepeatMode('repeat-all');
// //     repeatContext('context');
// //   } else {
// //     setRepeatMode('no-repeat');
// //     repeatContext('off');
// //   }
// // };

//   // const playNextTrack = () => {
//   //   if (repeatMode === 'repeat-one') {
//   //     // Repeat the same track
//   //     audioRef.current.currentTime = 0;
//   //     audioRef.current.play();
//   //   } else {
//   //     // Play the next track
//   //     const nextIndex = (trackIndex + 1) % tracks.length;
//   //     setTrackIndex(nextIndex);
//   //     setCurrentTrack(tracks[nextIndex]);
//   //   }
//   // };

//   // useEffect(() => {
//   //   const handleTrackEnd = () => {
//   //     if (repeatMode === 'repeat-all') {
//   //       playNextTrack();
//   //     } else if (repeatMode === 'repeat-one') {
//   //       audioRef.current.currentTime = 0;
//   //       audioRef.current.play();
//   //     } else {
//   //       handleNext();
//   //     }
//   //   };
//   //   audioRef.current.addEventListener('ended', handleTrackEnd);
//   //   return () => {
//   //     audioRef.current.removeEventListener('ended', handleTrackEnd);
//   //   };
//   // }, [audioRef, repeatMode, trackIndex, tracks, handleNext, playNextTrack]);

//     // <div className='extra-controls'>
//     //     <div className="volume-control">
//     //       <button onClick={() => setMuteVolume((prev) => !prev)} className="control-volume">
//     //         {muteVolume || volume < 5 ? (
//     //           <IoMdVolumeOff />
//     //         ) : volume < 40 ? (
//     //           <IoMdVolumeLow />
//     //         ) : (
//     //           <IoMdVolumeHigh />
//     //         )}
//     //       </button>
//     //       <input
//     //         type="range"
//     //         min={0}
//     //         max={100}
//     //         value={volume}
//     //         onChange={handleVolumeChange}
//     //         style={{
//     //           background: `linear-gradient(to right, #e91e63 ${volume}%, #333 ${volume}%)`
//     //         }}
//     //       />
//         {/* </div> */}
//       {/* <div className='extra-controls'>
//         <div className="volume-control">
//           <button onClick={() => setMuteVolume((prev) => !prev)} className="control-volume">
//             {muteVolume || volume < 5 ? (
//               <IoMdVolumeOff />
//             ) : volume < 40 ? (
//               <IoMdVolumeLow />
//             ) : (
//               <IoMdVolumeHigh />
//             )}
//           </button>
//           <input
//             type="range"
//             min={0}
//             max={100}
//             value={volume}
//             onChange={handleVolumeChange}
//             style={{
//               background: `linear-gradient(to right, #e91e63 ${volume}%, #333 ${volume}%)`
//             }}
//           />
//         </div> */}
//         {/* <div className='repeat-shuffle'>
//           <button onClick={shuffleTracks} className={`control-shuffle ${shuffleActive ? 'active' : ''}`}>
//             <IoShuffle />
//           </button>
//           <button onClick={handleRepeatMode} className={`control-repeat ${repeatMode !== 'no-repeat' ? 'active' : ''}`}>
//             {repeatMode === 'no-repeat' && <IoRepeat className='no-repeat' />}
//             {repeatMode === 'repeat-one' && <IoRepeat className="repeat-one" />}
//             {repeatMode === 'repeat-all' && <IoRepeat className="repeat-all" />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// } */}

// export default tracksControl;