// src/components/main/Player/Player.jsx
import React, { Component,useState, useEffect,useRef } from "react";
import { playTrack, pausePlayback, skipToNext } from '../../../api/spotify';
import { useDispatch, useSelector } from "react-redux";

import useAudioContext from './Visualiser/Visuals/useAudioContext';
import './Visualiser/Visuals/AudioControls.scss';
import Button from './Controls/controlButon';
import styled from "styled-components";
import propTypes from 'prop-types';
import axios from '../../../utils/axios';
import PlayerHoc from "../../../hoc/playerHoc";
import './Player.scss';
import { connect } from 'react-redux';
import {  pauseTrack, nextTrack, previousTrack, seekTrack } from '../../../redux/actions/playerActions';
import { getAudioApiFeatures } from '../../../api/spotify';
import { useSpotifyAuth } from '../../../hooks/SpotifyAuthProvider';
import './Details/detailsSection.scss'; 
import withUiActions from '../../../hoc/uiHoc';
import withPlayerHoc from "../../../hoc/playerHoc";
import withStatus from '../../../hoc/statusHoc';
import AudioControls from "./Visualiser/Visuals/AudioControls";
import DetailsSection from "./Details/detailSection";
import ProgressBar from "./Controls/progressBar";
import Volume from "./volume/Volume";
import SpotifyWebApi from "spotify-web-api-js"
import TracksControl  from "./playerControls/tracksControl";
import ExtraControls from "./extraControls/ExtraControls";
import { BsMusicNoteBeamed } from 'react-icons/bs';
import WebPlayback from "../../../spotify/webPlayback";
import TrackSider from './Controls/progressBar';
import header from "../../Layout/Header/userDetails/userDetails";




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

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;
// const defaultTrack = {
//   name: '',
//   album: {
//     uri: '',
//     images: [{ url: '' }]
//   },
//   artists: [{ name: '' }]
// };
const spotifyApi = new SpotifyWebApi();

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      if (accessToken) {
        try {
          const response = await spotifyApi.getMyCurrentPlayingTrack();
          if (response.item) {
            setCurrentTrack(response.item);
            setIsPlaying(response.is_playing);
          }
        } catch (error) {
          console.error('Error fetching current track:', error);
        }
      }
    };

    fetchCurrentTrack();
  }, [accessToken]);

  const handlePlay = () => {
    spotifyApi.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    spotifyApi.pause();
    setIsPlaying(false);
  };

  const albumImageUrl = currentTrack?.album?.images[0]?.url || '';

  return (
    <PlayerContainer>
      {currentTrack && (
        <div className="details-section">
          <img src={albumImageUrl} alt={currentTrack.album.name} />
          <h3>{currentTrack.name}</h3>
          <p>{currentTrack.artists.map((artist) => artist.name).join(',')}</p>
        </div>
      )}
      {isPlaying ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handlePlay}>Play</button>
      )}
      <div className="controls-container">
        <ProgressBar />
        <Volume />
      </div>
    </PlayerContainer>
  );
};

export default Player;
{/* <DetailsSection
            ids={currentTrack.linked_from?.id 
              ? `${currentTrack.linked_from.id},${currentTrack.id}`
              : currentTrack.id
            }
            trackName={currentTrack.name || ''}
            album={currentTrack.album.uri.split(':')[2]}
            artists={currentTrack.artists || []}
          /> */}
//         <div className="player-info">
//           <div className="image-container">
//             {albumImageUrl ? (
//               <img src={albumImageUrl} alt="audio avatar" />
//             ) : (
//               <div className="icon-wrapper">
//                 <span className="audio-icon">
//                   <BsMusicNoteBeamed />
//                 </span>
//               </div>
//             )}
//             <h3>{currentTrack.name}</h3>
//             <p>{currentTrack.artists.map(artist => artist.name).join(', ')}</p>
//           </div>
//         </div>

// ) : (
//   <p>Loading current track...</p>
// )}
//   return (
//     <PlayerContainer>
//       {currentTrack && currentTrack.name ? (
//         <>
//           <div className="player">
//             <img src={albumImageUrl} alt="Album Art" />
//             <div>
//               <h3>{currentTrack.name}</h3>
//               <p>{currentTrack.artists?.map(artist => artist.name).join(', ')}</p>
//             </div>
//             <div className="controls">
//               <button onClick={isPlaying ? handlePause : handlePlay}>
//                 {isPlaying ? 'Pause' : 'Play'}
//               </button>
//               <button onClick={handleNext}>Next</button>
//             </div>
//           </div>
//           <ProgressWrapper>
//             <div className="progress">
//               <span className="time current">{formatTime(timeProgress)}</span>
//               <input
//                 type="range"
//                 ref={progressBarRef}
//                 value={timeProgress}
//                 min="0"
//                 max={duration}
//                 onChange={handleProgressChange}
//               />
//               <span className="time">{formatTime(duration)}</span>
//             </div>
//           </ProgressWrapper>
//           <VolumeControl />
//         </>
//       ) : (
//         <div>No track currently playing</div>
//       )}
//     </PlayerContainer>
//   );
// };

// Player.propTypes = {
//   currentTrack: propTypes.object,
// };

// const mapStateToProps = state => ({
//   currentTrack: state.player.currentTrack || defaultTrack,
// });

// const mapDispatchToProps = {
//   pauseTrack,
//   nextTrack,
//   previousTrack,
//   seekTrack,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Player);