import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import withUiActions from '../../../../hoc/uiHoc';
import { fetchSearchData } from '../../../../redux/actions/searchActions';


import './Search.css';


class search extends Component {
  render = () => (
    <div className="track-search-container" >
      <form>
        <input name='search'
          type="text"
          placeholder="Search..."
          style={{ width: '100%', padding: '10px', margin: '10px 10px 10px 10px' }}
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
