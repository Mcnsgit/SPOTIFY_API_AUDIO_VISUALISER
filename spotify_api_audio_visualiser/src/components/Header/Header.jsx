// Rewritten code to fix performance issues
import React,{ Component } from 'react';
// import { useSelector } from 'react-redux';
import Search from './trackSearch/trackSearch';
// import PropTypes from 'prop-types';
// import UserProfile from '../userProfile/UserProfile';
import './Header.scss';
import UserDetails from '../userDetails/userDetails';
class Header extends Component {
  render = () => (
    <div className="main-header">
      <div className="header-container">
      <Search />
      </div>
      <div className="user-details-container">
      <UserDetails username={this.props.username} img={this.props.img} />
      </div>
    </div>
  );
}

export default Header;
