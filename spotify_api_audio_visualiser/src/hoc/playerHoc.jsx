import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  nextTrack,
  previousTrack,
  pauseTrack,
  playTrack,
  seekTrack,
  shuffle,
  repeatContext
} from '../redux/actions/playerActions';

import { containsCurrentTrack, fetchTracks } from '../redux/actions/libraryActions.js'; 
export default function(ComposedComponent) {
  class PlayerHoc extends Component {

    componentDidMount() {
    if (!this.props.tracks || this.props.tracks.length === 0) {
      this.props.fetchTracks();
    }
  }
    shouldComponentUpdate(nextProps) {
      return nextProps.playing !== this.props.playing;
    }
    componentDidUpdate(prevProps) {
      const { currentTrack } = this.props;
      if (prevProps.currentTrack.id !== currentTrack.id) {
        const id = currentTrack.id;
        const other = currentTrack.linked_from ? currentTrack.linked_from.id : null;
        this.props.containsCurrentTrack(other ? `${id},${other}` : id);
      }
    }

    render = () => (
      <ComposedComponent
        {...this.props}
        playContext={(context, offset) => this.props.playTrack(context, offset)}
        playTrack={() => this.props.playTrack()}
      />
    );
  }

  const mapStateToProps = state => {
    const playerStatus = state.playerReducer.status;
    return {
      currentTrack: playerStatus 
      ? playerStatus.track_window.current_track 
      : {},
      contains: state.libraryReducer.containsCurrent ? true : false,
      trackPosition: playerStatus ? playerStatus.position : 0,
      playing: playerStatus ? !playerStatus.paused : false,
      shuffleActive: playerStatus ? playerStatus.shuffle : false,
      repeatActive: playerStatus ? playerStatus.repeat_mode !== 0 : false,
      tracks: state.libraryReducer.tracks.items || []
    };
  };
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        nextTrack,
        previousTrack,
        pauseTrack,
        playTrack,
        seekTrack,
        shuffle,
        repeatContext,
        containsCurrentTrack,
        fetchTracks
      },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayerHoc);
}
