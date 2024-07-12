import React, { Component } from 'react';

import instance from '../../../../../utils/axios';
import Spinner from '../../../../common/spinner/spinner';

import withStatus from '../../../../../hoc/statusHoc';
import PlaylistTable from '../../../../tracksTable/playlistTable/playlistTable';

class TracksSearcher extends Component {
  state = {
    items: [],
    fetching: true
  };

  playTracks = (context, offset) => {
    const tracks = this.state.items.slice(offset).map(s => s.uri);
    instance.put('/me/player/play', { uris: tracks });
  };

  componentDidMount() {
    instance.get(`/search?q=${this.props.query}&type=track`).then(response => {
      this.setState({
        fetching: false,
        items: response.data.tracks.items,
        next: response.data.tracks.next
      });
    });
  }

  fetchMore = () => {
    if (this.state.next) {
      instance.get('/tracks?ids=' + this.state.next).then(response => {
        this.setState(prevState => {
          return {
            fetching: false,
            items:              [...prevState.items, ...response.data.tracks.items],
            next: response.data.tracks.next
          };
        });
      });
    }
  };

  // <PlaylistTable
  //   removeDate={true}
  //   fetchMoreTracks={this.fetchMore}
  //   playTrack={this.playTracks}
  //   pauseTrack={this.props.pauseTrack}
  //   current={this.props.currentTrack}
  //   playing={this.props.playing}
  //   more={this.state.next ? true : false}
  //   tracks={this.state.items}
  // />
  render = () => {
    return (
      <div className="generic-container">
        <Spinner section loading={this.state.fetching}>
        </Spinner>
      </div>
    );
  };
}

export default withStatus(TracksSearcher);
