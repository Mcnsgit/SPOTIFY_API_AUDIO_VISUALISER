
import React, { Component } from 'react';

import axios from '../../../utils/axios.jsx';
import VolumeSlider from './volumeSlider.jsx';
import Devices from '../../devices/devices.jsx';

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
    return (
      <div className="volume-control">
        <Devices onClick={this.onClick} />
        <VolumeSlider
        className="volume-slider"
        min={0}
        max={1}
        step={0.01}
        precision={2}
        valueText={value => `${Math.round(value * 100)}`}
        value={this.state.volume}
        onClick={this.onClick}
        onChange={value => this.setState({ volume: value }) || this.handleVolumeChange(value)}
        onChangeEnd={value => {
          this.setState({ volume: value }) || this.handleVolumeChange(value);
          this.changeVolume(value);
        }}
        player={this.props.player} />
      </div>
    );
  }
}


export default VolumeControl;
