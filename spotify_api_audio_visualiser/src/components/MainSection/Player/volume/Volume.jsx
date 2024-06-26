
import React, { Component } from 'react';

import axios from '../../../../utils/axios.jsx';
import VolumeSlider from './volumeSlider.jsx';
import Devices from '../../../devices/devices.jsx';
import styled from 'styled-components';
// import './VolumeControls.scss';
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

class VolumeControl extends Component {
  state = {
    volume: 1,
    previous: 1,
    onClick: false
  }
  handleVolumeChange = value => {
    axios.put(`/me/player/volume?volume_percent=${Math.round(value * 100)}`);
  };

  onOff = () => {
    this.setState(prevState => {
      return { volume: 0, previous: prevState.volume, onClick: true };
    });
    this.handleVolumeChange(0);
  };

  onOn = () => {
    this.setState(prevState => {
      return { volume: prevState.previous, onClick: false };
    });
    this.handleVolumeChange(this.state.previous);
  };
  onClick = () => {
    if (!this.state.onClick) {
      this.onOff();
    } else {
      if (this.state.volume === 0) {
        this.onOn();
      } else {
        this.setState({ onClick: false });
        this.onOff();
      }
    }
  };
  render() {
    const { volume } = this.state;
    const handleVolumeChange = e => {
      const rect = e.currentTarget.getBoundingClientRect();
      const newVolume = (e.clientX - rect.left) / rect.width;
      this.setState({ volume: newVolume });
      this.handleVolumeChange(newVolume);
    }
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
  </VolumeContainer>
);
};
}
export default VolumeControl;
