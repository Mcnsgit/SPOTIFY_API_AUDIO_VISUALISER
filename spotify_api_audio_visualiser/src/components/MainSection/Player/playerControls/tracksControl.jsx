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

const TracksControl = ({ playing, player }) => (
  <ControlsContainer>
    <Button
      className="back-track"
      icon="fa-step-backward reverse"
      onClick={player.previousTrack}
    />
    <Button
      className="play-btn"
      icon={
        'play-btn ' + (playing ? 'fa-pause-circle-o' : 'fa-play-circle-o')
      }
      onClick={() => { player.togglePlay() }}
    >
     { player.is_paused ? "PLAY" : "PAUSE" }
    </Button>
    <Button
      className="next-track"
      icon="fa-step-forward forward"
      onClick={() => { player.nextTrack() }}
    />
  </ControlsContainer>
);

export default TracksControl;
// export default tracksControl;
