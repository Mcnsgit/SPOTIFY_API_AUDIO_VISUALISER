// src/components/reusableComponents/VolumeSlider/VolumeSlider.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const VolumeSlider = ({ value, onChange }) => {
  const handleSliderChange = (e) => {
    const rect = e.target.getBoundingClientRect();
    const newValue = (e.clientX - rect.left) / rect.width;
    onChange(Math.max(0, Math.min(1, newValue))); // Clamp between 0 and 1
  };

  return (
    <SliderContainer onClick={handleSliderChange}>
      <VolumeIcon value={value} />
      <SliderTrack>
        <SliderBar value={value} />
        <SliderHandle value={value} />
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
  return <i className={`volumen fa ${volumeClass}`} aria-hidden="true" />;
};

VolumeSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
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

export default VolumeSlider;
