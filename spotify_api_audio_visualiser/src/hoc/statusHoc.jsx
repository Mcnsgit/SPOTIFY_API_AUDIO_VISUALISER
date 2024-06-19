import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  playTrack,
  pauseTrack,
  playTracks
} from '../redux/actions/playerActions';

import {
  removeTrack,
  addTrack,
  containsTrack
} from '../redux/actions/libraryActions';

export default function(ComposedComponent) {
  class StatusHoc extends Component {
    render = () => <ComposedComponent {...this.props} />;
  }

  const mapStateToProps = state => {
    return {
      currentUri: state.playerReducer.status
        ? state.playerReducer.status.context.uri
        : null,
      currentTrack: state.playerReducer.status
        ? state.playerReducer.status.track_window.current_track.linked_from
            .id || state.playerReducer.status.track_window.current_track.id
        : null,
      playing: state.playerReducer.status
        ? !state.playerReducer.status.paused
        : false
    };
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        pauseTrack,
        playTrack,
        playTracks,
        removeTrack,
        containsTrack,
        addTrack
      },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(StatusHoc);
}
