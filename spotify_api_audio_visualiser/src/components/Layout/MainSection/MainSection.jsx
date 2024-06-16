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
    const { user } = this.props;

    // Check if user data is available
    if (!user) {
      return (
        <div className="main-section">
          <Header />
          <div className="main-section-container">
            <p>Loading user data...</p> {/* Show loading state */}
          </div>
        </div>
      );
    }

    const { display_name, id, images } = user;
    const img = images && images[0] ? images[0].url : defaultProfile;

    return (
      <div className="main-section">
        <Header />
        <div className="main-section-container">
          {/* Display user details */}
          <div className="user-details">
            <img src={img} alt={display_name} />
            <h2>{display_name}</h2>
            <p>ID: {id}</p>
          </div>
          <SideMenu/>
          <Dashboard />
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
