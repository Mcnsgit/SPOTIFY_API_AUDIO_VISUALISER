import React, { useState } from 'react';
import axios from '../../../../utils/axios';
import Devices from '../../../devices/devices';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../Controls/TrackControls.css';

const VolumeSlider = ({ player }) => {
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newVolume = (e.clientX - rect.left) / rect.width;
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  return (
    <SliderContainer onClick={handleVolumeChange}>
      <VolumeIcon value={volume} />
      <SliderTrack>
        <SliderBar value={volume} />
        <SliderHandle value={volume} />
      </SliderTrack>
    </SliderContainer>
  );
};

const VolumeIcon = ({ value }) => {
  let volumeClass;
  if (value > 0.5) {
    volumeClass = 'fa-volume-up';
  } else if (value === 0) {
    volumeClass = 'fa-volume-off';
  } else {
    volumeClass = 'fa-volume-down';
  }
  return <i className={`volume-icon fa ${volumeClass}`} aria-hidden="true" />;
};

VolumeSlider.propTypes = {
  player: PropTypes.object
};

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
`;

const SliderTrack = styled.div`
  position: relative;
  height: 8px;
  width: 100%;
  background-color: #535353;
  margin: 0 10px;
  border-radius: 4px;
`;

const SliderBar = styled.div`
  position: absolute;
  border-radius: 4px;
  background-color: #1db954;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${({ value }) => `${value * 100}%`};
`;

const SliderHandle = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ffffff;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 0.2s;
  top: 50%;
  left: ${({ value }) => `${value * 100}%`};
  &:hover {
    transform: translate(-50%, -50%) scale(1.3);
  }
`;

const VolumeControl = ({ player }) => {
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  const handleVolumeChange = (value) => {
    axios.put("/me/player/volume?volume_percent=" + Math.round(value * 100));
  };


  const handleToggle = () => {
    if (!isClicked) {
      setPreviousVolume(volume);
      setVolume(0);
      setIsClicked(true);
      handleVolumeChange(0);
    } else {
      if (volume === 0) {
        setVolume(previousVolume);
        setIsClicked(false);
        handleVolumeChange(previousVolume);
      } else {
        setIsClicked(false);
        setVolume(0);
        handleVolumeChange(0);
      }
    }
  };

  const handleChange = (value) => {
    setVolume(value);
    handleVolumeChange(value);
  };

  return (
    <div className="volume-control">
      <Devices onClick={handleToggle} />
      <VolumeSlider player={player} value={volume} onClick={handleToggle} onChange={handleChange} />
    </div>
  );
};

export default VolumeControl;