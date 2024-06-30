import Button from '../Controls/controlButon';
import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PlayerControlsHoc from '../../../../hoc/playerControlsHoc.jsx';

const ExtraControlsContainer = styled.div`
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

const ExtraControls = ({ shuffleActive, repeatActive, shuffle, repeatContext }) => (
  <ExtraControlsContainer>
    <Button
      onClick={() => shuffle(!shuffleActive)}
      className={"shuffle-track" + (shuffleActive ? ' active' : '')}
      icon="fa-random"
    />
    <Button
      onClick={() => repeatContext(repeatActive ? 'off' : 'context')}
      className={"repeat-track" + (repeatActive ? ' active' : '')}
      icon="fa-repeat"
    />
  </ExtraControlsContainer>
);

ExtraControls.propTypes = {
  shuffleActive: PropTypes.bool,
  repeatActive: PropTypes.bool,
  shuffle: PropTypes.func,
  repeatContext: PropTypes.func,
};

export default PlayerControlsHoc(ExtraControls);
// // const ExtraControls = props =>
// <div className="extra-controls">
// <Button
//   onClick={() => props.shuffle
//     (!props.shuffleActive)} 
//   className={"shuffle-track" + 
//     (props.shuffleActive ? 
//       ' active' : '')}
//   icon="fa-random"
// />
//   <Button
//   onClick={() => props.repeatContext(props.repeatActive ? 'off' : 
//     'context')}
//     className={"repeat-track" + 
//       (props.repeatActive ? ' active' : '')}
//     icon="fa-repeat"
//   />
// </div>
