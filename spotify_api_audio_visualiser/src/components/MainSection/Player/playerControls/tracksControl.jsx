import React, { useState } from 'react';
import './PlayerControls.scss';
import instance from '../../../../utils/axios';
import Button from '../Controls/controlButon';

const TracksControl =  props => 
  <div className="track-control">
    <Button
      onClick={() => props.shuffle(!props.shuffleActive)}
      className={'shuffle-song' + (props.shuffleActive ? ' active' : '')}
      icon="fa-random"
    />
    <Button
      className="back-song"
      icon="fa-step-backward reverse"
      onClick={props.previousSong}
    />
    <Button
      className="play-btn"
      onClick={props.playing ? props.pauseSong : props.playSong}
      icon={
        'play-btn ' + (props.playing ? 'fa-pause-circle-o' : 'fa-play-circle-o')
      }
      playBtn
    />
    <Button
      className="next-song"
      icon="fa-step-forward forward"
      onClick={props.nextSong}
    />
    <Button
      onClick={() =>
        props.repeatContext(props.repeatActive ? 'off' : 'context')
      }
      className={'repeat-song' + (props.repeatActive ? ' active' : '')}
      icon="fa-retweet"
    />
  </div>



export default TracksControl;