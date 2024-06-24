import React from 'react';

import Button from './controlButon';
import './TrackControls.css';
const tracksControl = props => (
  <div className="track-control">
    <Button
      onClick={() => props.shuffle(!props.shuffleActive)}
      className={'shuffle-track' + (props.shuffleActive ? ' active' : '')}
      icon="fa-random"
    />
    <Button
      className="back-track"
      icon="fa-step-backward reverse"
      onClick={props.previousTrack}
    />
    <Button
      className="play-btn"
      onClick={props.playing ? props.pauseTrack : props.playTrack}
      icon={
        'play-btn ' + (props.playing ? 'fa-pause-circle-o' : 'fa-play-circle-o')
      }
      playBtn
    />
    <Button
      className="next-track"
      icon="fa-step-forward forward"
      onClick={props.nextTrack}
    />
    <Button
      onClick={() =>
        props.repeatContext(props.repeatActive ? 'off' : 'context')
      }
      className={'repeat-track' + (props.repeatActive ? ' active' : '')}
      icon="fa-retweet"
    />
  </div>
);

export default tracksControl;