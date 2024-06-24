// src/components/main/Player/Player.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Player.scss';
import ProgressBar from './Controls/trackSider';
import DetailSection from './Details/detailSection';
import TracksControl from './playerControls/tracksControl';
import withSpotifyPlayer from '../../../hoc/playerHoc';
import { fetchTracks } from '../../../redux/actions/libraryActions';

const Player = ({
  currentTrack,
  playTrack,
  pauseTrack,
  nextTrack,
  previousTrack,
  seekTrack,
  shuffle,
  repeatContext,
  playing,
  shuffleActive,
  repeatActive,
  handleVolume
}) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const progressBarRef = useRef();
  const token = useSelector(state => state.sessionReducer.token);
  const tracks = useSelector(state => state.libraryReducer.tracks);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tracks.length === 0) {
      dispatch(fetchTracks());
    }
  }, [dispatch, tracks]);

  useEffect(() => {
    if (tracks.length > 0 && !currentTrack) {
      setTrackIndex(0);
      playTrack(tracks[0]);
    }
  }, [tracks, currentTrack, playTrack]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      playTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      playTrack(tracks[trackIndex + 1]);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
      audioRef.current.ontimeupdate = () => {
        setTimeProgress(audioRef.current.currentTime);
      };
    }
  }, [audioRef]);

  return (
    <div className="player-container">
      <div className="details-container">
        {currentTrack && (
          <DetailSection currentTrack={currentTrack} />
        )}
      </div>
      <div className="controls-container">
        <TracksControl
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          duration={duration}
          setTimeProgress={setTimeProgress}
          tracks={tracks}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
          currentTrack={currentTrack}
          handleNext={handleNext}
          playTrack={playTrack}
          pauseTrack={pauseTrack}
          nextTrack={nextTrack}
          previousTrack={previousTrack}
          seekTrack={seekTrack}
          shuffle={shuffle}
          repeatContext={repeatContext}
          playing={playing}
          shuffleActive={shuffleActive}
          repeatActive={repeatActive}
        />
      </div>
      <div className="extra-buttons">
        {/* Volume, Shuffle, Repeat buttons */}
        <button onClick={ handleVolume }><i className="fa fa-volume-up"></i></button>
        <button onClick={shuffle}><i className="fa fa-random"></i></button>
        <button onClick={repeatContext}><i className="fa fa-repeat"></i></button>
      </div>
      <div className="progress-bar">
        <ProgressBar
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          duration={duration}
          timeProgress={timeProgress}
        />
      </div>
    </div>
  );
};

export default withSpotifyPlayer(Player);
