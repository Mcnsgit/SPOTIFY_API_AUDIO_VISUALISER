import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPlaylistsMenu } from '../../../redux/actions/playlistActions';
import MenuItem from './menuItem';
import './rightSection.scss';

const sectionOne = [{ name: 'Recently Played', view: 'recently', id: 2 }];
const sectionTwo = [
  { name: 'Create Playlist', view: 'create', id: 3 },
  { name: 'Albums', view: 'albums', id: 4 },
  { name: 'Artists', view: 'artists', id: 5 }
];

class RightSideMenu extends Component {
  state = {
    active: 'Recently Played'
  };

  componentDidMount() {
    this.props.fetchPlaylistsMenu();
  }

  setActive = (item, isPlaylist) => {
    this.setState({ active: item.id });
    this.props.setView(item.view || 'recently');
  };

  generateItems = (items, isPlaylist = false) => {
    return items.map(item => (
      <MenuItem
        key={item.id}
        title={item.name}
        active={this.state.active === item.id}
        onClick={() => this.setActive(item, isPlaylist)}
      />
    ));
  };

  render() {
    const playlists = this.props.playlists ? this.props.playlists.items : [];
    return (
      <ul className="right-side-menu-container">
        {this.generateItems(sectionOne)}
        <h3 className="library-header">Recently Played</h3>
        {this.generateItems(sectionTwo)}
        <div className="user-playlist-container">
          <h3 className="library-header">Playlists</h3>
          {this.generateItems(playlists, true)}
        </div>
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlistReducer.playlists || null
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPlaylistsMenu }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RightSideMenu);
