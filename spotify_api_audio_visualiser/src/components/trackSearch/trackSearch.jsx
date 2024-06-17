import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withUiActions from '../../hoc/uiHoc';
import { fetchSearchData } from '../../redux/actions/searchActions';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends Component {
  state = {
    searchValue: '',
  };

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchSearchData(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (  
      <form className={`input-bar ${this.props.className}`} onSubmit={this.handleSubmit}>
        <input 
          id="search-bar"
          type="text"
          value={this.state.searchValue}
          onChange={this.handleChange}
          placeholder={'Search for artists, albums, playlists or tracks'}
          className={`input-bar ${this.props.className}`}
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSearchData,
    },
    dispatch
  );
};

Search.propTypes = {
  fetchSearchData: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};

const mapStateToProps = state => {
  return {
    searchValue: state.searchValue
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUiActions(Search));