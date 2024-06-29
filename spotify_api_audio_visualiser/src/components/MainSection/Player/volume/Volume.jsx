
import React, { useState } from 'react';
import axios from '../../../../utils/axios';
import styled from 'styled-components';

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;

  input[type='range'] {
    width: 100px;
    background: #1db954;
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

const VolumeControl = () => {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    axios.put(`/me/player/volume?volume_percent=${Math.round(newVolume * 100)}`);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <VolumeContainer>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <button onClick={toggleMute}>
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </VolumeContainer>
  );
};

export default VolumeControl;

