import React from 'react';
import { useSelector } from 'react-redux';
import profile from '../../assets/images/profile.png';
import './mainSection.scss';
import Footer from '../Layout/Footer/Footer';
import Visualizer from './Player/Visualiser/Visualiser'

const MainSection = () => {
  // const user = useSelector(state => state.userReducer.user);
  // const { name, id, images } = user || {};
  // const img = images && images.length > 0 ? images[0].url : profile;

  return (
    <div className="main-section">
      <div className="main-app-container">
        <div className="main">
          <AudioVisualizer />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainSection;