import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import axios from '../../../../utils/axios';
import {
  fetchTracks,
  fetchRecentTracks,
  fetchMoreTracks
} from '../../../../redux/actions/libraryActions';
import { setStatus } from '../../../../redux/actions/playerActions';
import Playlist from '../../../tracksTable/playlistTable/playlistTable';
import Header from '../../../Layout/Header/tracksHeader';
import Spinner from '../../../common/spinner/spinner';

import withStatus from '../../../../hoc/statusHoc';

class TracksList extends Component {
  componentDidMount() {
    this.fetchTracks();
  }

  fetchTracks() {
    if (this.props.recently) {
      this.props.fetchRecentTracks();
    } else {
      this.props.fetchTracks();
    }
  }

  playTracks = (context, offset) => {
    const tracks = this.props.tracks.slice(offset).map(s => s.track.uri);
    axios.put('/me/player/play', { uris: tracks });
  };

  render = () => (
    <Spinner section loading={this.props.fetching}>
      <div className="player-container">
        <Header
          title={this.props.recently ? 'Recently Played' : 'Tracks'}
          playTrack={() => this.playTracks(this.props.tracks, 0)}
          pauseTrack={this.props.pauseTrack}
          playing={this.props.playing}
        />
        <Playlist
          tracks={this.props.tracks}
          playTrack={this.playTracks}
          pauseTrack={this.props.pauseTrack}
          current={this.props.currentTrack}
          playing={this.props.playing}
          more={this.props.next ? true : false}
          fetchMoreTracks={this.props.fetchMoreTracks}
        />
      </div>
    </Spinner>
  );
}
TracksList.PropTypes = {
  fetchMoreTracks: propTypes.func,
  fetchRecentTracks: propTypes.func,
  fetchTracks: propTypes.func,
  tracks: propTypes.array,
  recently: propTypes.bool,
  pauseTrack: propTypes.func,
  playing: propTypes.bool,
  currentTrack: propTypes.string,
};
const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token.access_token : '',
    tracks: state.libraryReducer.tracks ? state.libraryReducer.tracks.items : [],
    fetchTracksError: state.libraryReducer.fetchTracksError,
    user: state.userReducer.user.id,
    fetching: state.libraryReducer.fetchTracksPending,
    next: state.libraryReducer.tracks ? state.libraryReducer.tracks.next : false
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchTracks,
      fetchRecentTracks,
      fetchMoreTracks
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStatus(TracksList));
