import Button from '../Controls/controlButon';
import React from "react";
import styled from 'styled-components';
import propTypes from 'prop-types';
import PlayerHoc from '../../../../hoc/playerHoc.jsx';
import Devices from '../../../common/devices/devices.jsx';
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

// const ExtraControls = ({ shuffleActive, repeatActive, shuffle, repeatContext }) => (
//   <ExtraControlsContainer>
//     <Button
//       onClick={() => shuffle(!shuffleActive)}
//       className={"shuffle-track" + (shuffleActive ? ' active' : '')}
//       icon="fa-random"
//     />
//     <Button
//       onClick={() => repeatContext(repeatActive ? 'off' : 'context')}
//       className={"repeat-track" + (repeatActive ? ' active' : '')}
//       icon="fa-repeat"
//     />
//   </ExtraControlsContainer>
// );

// ExtraControls.PropTypes = {
//   shuffleActive: propTypes.bool,
//   repeatActive: propTypes.bool,
//   shuffle: propTypes.func,
//   repeatContext: propTypes.func,
// };

// // export default PlayerControlsHoc(ExtraControls);
// const ExtraControlsContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;

//   button {
//     background: none;
//     border: none;
//     color: #fff;
//     font-size: 20px;
//     cursor: pointer;

//     &:hover {
//       color: #1db954;
//     }
//   }
// `;

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

ExtraControls.PropTypes = {
  shuffleActive: propTypes.bool,
  repeatActive: propTypes.bool,
  shuffle: propTypes.func,
  repeatContext: propTypes.func,
};

export default PlayerHoc(ExtraControls);