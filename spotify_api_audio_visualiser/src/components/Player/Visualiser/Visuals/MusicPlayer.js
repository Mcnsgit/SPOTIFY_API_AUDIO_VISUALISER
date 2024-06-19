import React, { useContext } from 'react';
import { SpotifyApiContext } from '../..//utils/SpotifyApiContext.js';
import './MusicPlayer.scss';

const MusicPlayer = () => {
  const { isPlaying, playTrack, togglePlayPause, setVolume, currentTrack } = useContext(SpotifyApiContext);

  return (
    <div className="player-container">
      {currentTrack && (
        <div className="track-info">
          <img src={currentTrack.album.images[0].url} alt={currentTrack.name} />
          <div>
            <h2>{currentTrack.name}</h2>
            <p>{currentTrack.artists.map(artist => artist.name).join(', ')}</p>
          </div>
        </div>
      )}
      <div className="controls">
        <button onClick={() => playTrack(currentTrack.uri)}>Play</button>
        <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input type="range" min="0" max="1" step="0.01" onChange={(e) => setVolume(e.target.value)} />
      </div>
    </div>
  );
};

export default MusicPlayer;
