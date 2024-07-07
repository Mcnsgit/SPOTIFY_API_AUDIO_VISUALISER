import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { containsCurrentTrack, fetchTracks } from "../redux/actions/libraryActions.js";

import PropTypes from "prop-types";
import {
    nextTrack,
    previousTrack,
    pauseTrack,
    playTrack,
    seekTrack,
    shuffle,
    repeatContext
} from "../redux/actions/playerActions";
export default function withPlayerHoc(ComposedComponent) {
  class PlayerHoc extends Component {
    componentDidMount() {
      const { currentTrack, containsCurrentTrack } = this.props;
      if (currentTrack && currentTrack.id) {
        containsCurrentTrack(currentTrack.id);
      }
    }

    componentDidUpdate(prevProps) {
      const { currentTrack, containsCurrentTrack } = this.props;
      const { id, linked_from } = currentTrack;
      if (prevProps.currentTrack?.id !== id) {
        const otherId = linked_from ? linked_from.id : null;
        const trackIds = otherId ? `${id},${otherId}` : id;
        containsCurrentTrack(trackIds);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  PlayerHoc.propTypes = {
    currentTrack: PropTypes.object,
    playTrack: PropTypes.func.isRequired,
    playContext: PropTypes.func,
  };

  const mapStateToProps = (state) => {
    const playerStatus = state.playerReducer.status || {};
    const libraryTracks = state.libraryReducer.tracks.items || [];


      return {
        currentTrack: playerStatus.track_window?.current_track || null,
        contains: !!state.libraryReducer.containsCurrent,
        trackPosition: playerStatus.position || 0,
        playing: !playerStatus.paused,
        shuffleActive: playerStatus.shuffle,
        repeatActive: playerStatus.repeat_mode !== 0,
        tracks: libraryTracks,
        playContext: state.playerReducer.playContext
    };
  };

  const mapDispatchToProps = (dispatch) => bindActionCreators(
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

  return connect(mapStateToProps, mapDispatchToProps)(PlayerHoc);
};