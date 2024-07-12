import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  fetchMoreTracks,
  movePlaylistTrack
} from "../../../../redux/actions/playlistActions";

import Header from "./components/header/playlistHeader";
import Table from "../../../../components/tracksTable/playlistTable/playlistTable";

import withStatus from "../../../../hoc/statusHoc";
import Spinner from "../../../../components/common/spinner/spinner";

class Playlist extends Component {
  render = () => {
    return (
      <Spinner section loading={this.props.fetching}>
        <div className="player-container">
          <Header
            empty={
              this.props.playlist && this.props.playlist.tracks.items.length
                ? false
                : true
            }
            playlist={this.props.playlist || {}}
            currentUri={this.props.currentUri}
            playing={this.props.playing}
            pauseTrack={this.props.pauseTrack}
            playTrack={() => this.props.playTrack(this.props.playlist.uri, 0)}
          />
          <Table
            more={
              this.props.playlist && this.props.playlist.tracks.next
                ? true
                : false
            }
            playlist={this.props.playlist || {}}
            fetchMoreTracks={this.props.fetchMoreTracks}
            movePlaylistTrack={this.props.movePlaylistTrack}
            current={this.props.currentTrack}
            playing={this.props.playing}
            uri={this.props.playlist ? this.props.playlist.uri : ""}
            tracks={this.props.playlist ? this.props.playlist.tracks.items : []}
            pauseTrack={this.props.pauseTrack}
            playTrack={this.props.playTrack}
          />
        </div>
      </Spinner>
    );
  };
}
const mapStateToProps = state => {
  return {
    playlist: state.playlistReducer.playlist
      ? state.playlistReducer.playlist
      : null,
    fetching: state.playlistReducer.fetchPlaylistPending
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchMoreTracks,
      movePlaylistTrack
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStatus(Playlist));
