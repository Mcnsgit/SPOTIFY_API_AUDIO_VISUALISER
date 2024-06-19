import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setModal } from '../../../redux/actions/uiActions';

import RightSideMenu from './RightSideMenu';
import NewPlaylist from './components/newplaylist';
import trackList from '../RightSection/components/trackList/trackList';


import './rightSection.scss';

class RightSection extends Component {
  render() {
    return (
      <div className="right-section">
        <RightSideMenu />
        <div className="bottom-section">
          {this.props.view === 'recently' && <trackList recently />}
          {this.props.view === 'create' && <NewPlaylist setModal={this.props.setModal} />}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  view: state.uiReducer.view
});

const mapDispatchToProps = dispatch => bindActionCreators({ setModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RightSection);
