import React from "react";
import Button from '../Controls/controlButon';

import '../Player.scss'
import styled from 'styled-components';

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

const ExtraControls = props => {
    return (
        <ExtraControlsContainer>
            <Button
                onClick={() => props.shuffle(!props.shuffleActive)}
                className={"shuffle-track" + (props.shuffleActive ? ' active' : '')}
                icon={props.shuffle
                    ? "fa-random"   
                    : "fa-random"}
            />
            <Button
                onClick={() => props.repeatContext(props.repeatActive ? 'off' : 'context')}
                className={"repeat-track" + (props.repeatActive ? ' active' : '')}
                icon={props.repeatActive ? "IoRepeat" : "IoRepeat"}
            />
        </ExtraControlsContainer>
    );
};

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
export default ExtraControls;