import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSearchData } from '../../../redux/actions/searchActions'; // Import the correct action
import withUiActions from '../../../hoc/uiHoc.jsx';
import MenuItem from './menuItem.jsx';
import './SideMenu.css';

const sectionOne = [{ name: 'search', view: 'search', id: 3 }];
const sectionTwo = [
  { name: 'visualizer', view: 'visualizer', id: 6 }
];

class LeftSideMenu extends Component {
  state = {
    active: 'Browse',
  };

  componentDidMount() {
    this.props.fetchSearchData(''); // Fetch initial data or provide a default query
  }

  setActive = (item) => {
    this.setState({ active: item.id });
    this.props.setView(item.view || 'browse');
  };

  generateItems = (items, isPlaylist = false) => {
    return items.map(item => (
      <MenuItem
        key={item.id}
        title={item.name}
        active={this.state.active === item.id}
        onClick={() => this.setActive(item)}
      />
    ));
  };

  render() {
    const playlists = this.props.playlists ? this.props.playlists.items : [];
    return (
      <ul className="side-menu-container">
        {this.generateItems(sectionOne)}
        <h3 className="library-header">Your Library</h3>
        {this.generateItems(sectionTwo)}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlistReducer.playlists || null,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSearchData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withUiActions(LeftSideMenu));
