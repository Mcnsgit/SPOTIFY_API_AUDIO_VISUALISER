
import React, { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import styled from 'styled-components';
import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';
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
    

    const VolumeControl = ({ audioRef, volume, muteVolume }) => {
      const setVolume = (value) => {
        if (audioRef.current) {
          audioRef.current.volume = value / 100;
          // Avoid making API call on every volume change for performance optimization
        }
      };
    
      const setMuteVolume = (value) => {
        if (audioRef.current) {
          audioRef.current.muted = value;
          // Avoid making API call on every mute/unmute action for performance optimization
        }
      };
    
      useEffect(() => {
        if (audioRef) {
          audioRef.current.volume = volume / 100;
          audioRef.current.muted = muteVolume;
        }
      }, [volume, audioRef, muteVolume]);
    
      return (
        <VolumeContainer>
          <div className="volume">
            <button onClick={() => setMuteVolume((prev) => !prev)}>
              {muteVolume || volume < 5 ? (
                <IoMdVolumeOff />
              ) : volume < 40 ? (
                <IoMdVolumeLow />
              ) : (
                <IoMdVolumeHigh />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              style={{
                background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
              }}
            />
          </div>
        </VolumeContainer>
      );
    };
    
    export default VolumeControl;
// const transition = 'height 0.15s 0s ease, width 0.15s 0s ease'

// const StyledSlider = styled.input`
// cursor: pointer;
// background: linear-gradient(
// to right,
// ${(props) => (props.seeking ? props.highlighted : props.colorBefore)} 0%,
// ${(props) => (props.seeking ? props.highlighted : props.colorBefore)}
// ${(props) => props.percent}%,
// ${(props) => props.colorAfter} ${(props) => props.percent}%,
// ${(props) => props.colorAfter} 100%
// );
// border-radius: 8px;
// height: 4px;
// width: 100%;
// outline: none;
// padding: 0;
// margin: 5px 10px;
// -webkit-transition: ${transition};
// -moz-transition: ${transition};
// -o-transition: ${transition};
// transition: ${transition};
// -webkit-appearance: none;
// &::-webkit-slider-thumb {
// border: none;
// -webkit-appearance: none;
// width: ${(props) => (props.seeking ? props.growTo : props.size)}px;
// height: ${(props) => (props.seeking ? props.growTo : props.size)}px;
// cursor: pointer;
// background: ${(props) => (props.seeking ? props.highlighted : props.colorBefore)};
// border-radius: 50%;
// }
// &::-ms-thumb {
// border: none;
// height: ${(props) => (props.seeking ? props.growTo : props.size)}px;
// width: ${(props) => (props.seeking ? props.growTo : props.size)}px;
// border-radius: 50%;
// background: ${(props) => (props.seeking ? props.highlighted : props.colorBefore)};
// cursor: pointer;
// }
// &::-moz-range-thumb {
// border: none;
// height: ${(props) => (props.seeking ? props.growTo : props.size)}px;
// width: ${(props) => (props.seeking ? props.growTo : props.size)}px;
// border-radius: 50%;
// background: ${(props) => (props.seeking ? props.highlighted : props.colorBefore)};
// cursor: pointer;
// }
// `