import React, { act, Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { setModal } from '../../../redux/actions/uiActions';
import Search from '../MainSection/Search/SearchResults';

import LeftSideMenu from './LeftSideMenu'
import TrackCover from '../../../components/trackCover/trackCover';
// import NewPlaylist from './components/newplaylist';

import './leftSection.scss';

const LeftSection = ({ view }) => {
  return (
    <div className="left-section">
      <LeftSideMenu />
      <div className='buttom-section'>
      <TrackCover />
      </div>

      {view === 'search' && <Search />}
    </div>
  );
};

const mapStateToProps = state => ({
  view: state.uiReducer.view
});

export default connect(mapStateToProps)(LeftSection);