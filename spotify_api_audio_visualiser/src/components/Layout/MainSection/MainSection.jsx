import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/Header/Header';
// import Footer from '../../../components/Footer/Footer';
import Dashboard from '../../../components/Dashboard/Dashboard';
import SideMenu from '../SideMenu/SideMenu';
import defaultProfile from './images/profile.png';
import './mainSection.css';

class MainSection extends Component {
  render = () => {
    // Destructure props for easier access
    const { userProfile } = this.props;

    // Check if user data is available
    if (!userProfile) {
      return (
        <div className="main-section">
          <Header  searchValue={''} onSearchChange={() => {}} results={[]} onSelect={() => {}} userProfile={userProfile} />
          
        </div>
      );
    }

    const { display_name, id, images } = user;
    const img = images && images[0] ? images[0].url : defaultProfile;

    return (
      <div className="main-section">
        <Header searchValue={''} onSearchChange={() => {}} results={[]} onSelect={() => {}} userProfile={userProfile} />
        <div className="main-section-container">
          {/* Display user details */}
          <div className="user-details">
            <img src={img} alt={display_name} />
            <h2>{display_name}</h2>
            <p>ID: {id}</p>
          </div>
          <div className="main-section-content">
          <SideMenu />
.
          <Dashboard />

          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    view: state.uiReducer.view
  };
};

export default connect(mapStateToProps)(MainSection);
