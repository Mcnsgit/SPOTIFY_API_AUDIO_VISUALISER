import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withUiActions from '../../../hoc/uiHoc';
import { fetchSearchData } from '../../../redux/actions/searchActions';


import './Search.css';
const container = {
  position: 'relative',
  left: '190px',
  top: '50px'
};

const input = {
  background: '#fff',
  width: 180,
  borderRadius: 10,
  border: 'none',
  fontFamily: "'Proxima Nova', Georgia, sans-serif",
  padding: '4px 4px 4px 10px',
  outline: 'none',
  marginTop: -2
};

class search extends Component {
  render = () => (
    <div className="track-search-container" style={container}>
      <form>
        <input
          type="text"
          placeholder="Search..."
          style={input}
          onChange={event => this.props.fetchSearchData(event.target.value)}
          onClick={this.props.onSearch}
        />
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSearchData
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withUiActions(search));
