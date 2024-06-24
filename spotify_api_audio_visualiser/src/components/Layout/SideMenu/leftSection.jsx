import React, { act, Component } from 'react';
import { useSelector } from 'react-redux';
import Search from '../../MainSection/Search/SearchResults';
import LeftSideMenu from './LeftSideMenu'
import TrackCover from '../SideMenu/trackCover/trackCover';

import Browse from '../../MainSection/sections/browse/browser';
import './leftSection.scss';
import SearchResults from '../../MainSection/Search/SearchResults';
// import { bindActionCreators } from 'redux';
// import { setModal } from '../../../redux/actions/uiActions';
// import NewPlaylist from './components/newplaylist';



const LeftSection = () => {
  const view = useSelector((state) => state.uiReducer.view);

  const renderView = () => {
    switch (view) {
      case 'search':
        return <SearchResults />;
      case 'visualizer':
        return <Visualizer />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <div className="left-section">
      <LeftSideMenu /> : {renderView()}
      <div className="content-section">
        <TrackCover />

      </div>
    </div>
  );
};

export default LeftSection;