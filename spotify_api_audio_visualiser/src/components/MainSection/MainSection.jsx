import React from 'react';
import { useSelector } from 'react-redux';
import profile from '../../assets/images/profile.png';
import './mainSection.scss';
import Footer from '../Layout/Footer/Footer';
import Visualizer from './Player/Visualiser/Visualiser'
import Header from '../Layout/Header/Header';
import LeftSection from '../Layout/SideMenu/leftSection';
const MainSection = () => {
  const user = useSelector(state => state.userReducer.user);
  const { name, id, images } = user || {};
  const img = images && images.length > 0 ? images[0].url : profile;

  return (
    <div className="main-app-container">
        <div className="header-section" id='header'>
          <Header username={name || id} img={img || profile}/>
          <div className="left-container">
        <LeftSection />
      </div>
        <div className="main-section">


          <Visualizer />
        </div>
      </div>



    </div>
  );
};

export default MainSection;