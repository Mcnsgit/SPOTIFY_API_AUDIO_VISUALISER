// Rewritten code to fix performance issues
import React,{ Component } from 'react';
// import { useSelector } from 'react-redux';
import Search from './trackSearch/trackSearch';
// import PropTypes from 'prop-types';
// import UserProfile from '../userProfile/UserProfile';
import './Header.scss';
import UserDetails from './userDetails/userDetails';
class Header extends Component {
  render = () => (
    <div className="header">

      <h1>Spotify Visualizer</h1>
      <div className="search-bar">
        <Search  type="text" placeholder="Search for tracks, artists, albums" />
      </div>
      <div className='user-details'>
        <UserDetails username={this.props.username} img={this.props.img} />
      </div>
    </div>
  );
}

export default Header;
