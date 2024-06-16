import React, { Component } from 'react';
import UserDetails from '../userDetails/userDetails';
import Search from '../trackSearch/trackSearch';
import SearchResults from '../Search/SearchResults/SearchResults';

import './Header.scss';

class Header extends Component {
  render = () => (
    <div className="main-header">
      <Search />
      <SearchResults results={this.props.results} onSelect={this.props.onSelect} />
      <UserDetails username={this.props.username} img={this.props.img} />
    </div>
  );
}

export default Header;
