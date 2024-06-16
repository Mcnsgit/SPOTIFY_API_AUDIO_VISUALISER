// src/components/reusableComponents/ProgressBar/ProgressBar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SliderBar = ({ value, style }) => (
  <div
    style={{
      position: 'absolute',
      borderRadius: 4,
      top: 0,
      bottom: 0,
      left: 0,
      width: `${value * 100}%`,
      backgroundColor: '#1DB954',
      ...style,
    }}
  />
);

const SliderHandle = ({ value, style }) => (
  <div
    style={{
      position: 'absolute',
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: '#FFFFFF',
      transform: 'translate(-50%, -50%) scale(1)',
      transition: 'transform 0.2s',
      top: '50%',
      left: `${value * 100}%`,
      ...style,
    }}
  />
);

// Composite Progress Bar Component
const ProgressBar = ({
  isEnabled,
  value,
  position,
  duration,
  onSeek,
}) => {
  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const seekValue = (e.clientX - rect.left) / rect.width;
    onSeek(seekValue * duration);
  };

  return (
    <ProgressContainer
      onClick={isEnabled ? handleSeek : null}
    >
      <FormattedTime>{formatTime(position)}</FormattedTime>
      <SliderTrack>
        <SliderBar value={value} />
        <SliderHandle value={value} />
      </SliderTrack>
      <FormattedTime>{formatTime(duration)}</FormattedTime>
    </ProgressContainer>
  );
};

ProgressBar.propTypes = {
  isEnabled: PropTypes.bool,
  value: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onSeek: PropTypes.func.isRequired,
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const ProgressContainer = styled.div`
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

const FormattedTime = styled.span`
  color: #b3b3b3;
  font-size: 12px;
`;

export default ProgressBar;
