import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.scss';


import { setToken } from './redux/actions/sessionActions';
import { fetchUser } from './redux/actions/userActions';
// import Header from './components/Layout/Header/Header';
import Spinner from './components/spinner/spinner';
import Login from './spotify/login';
import WebPlaybackReact from './spotify/webPlayback';
// import MainSection from './components/MainSection/MainSection';
// import LeftSection from './components/Layout/SideMenu/leftSection';
import LeftSection from './components/Layout/SideMenu/leftSection';
import PropTypes from 'prop-types';

// import RightSection from './components/Layout/RightSection/RightSection';
// import defaultProfile from './components/MainSection/images/profile.png';
// import Footer from './components/Layout/Footer/Footer';
import MainSection from './components/MainSection/MainSection';
// import Dashboard from './components/MainSection/Dashboard/Dashboard';
window.onSpotifyWebPlaybackSDKReady = () => {};


class App extends Component {
  state = {

    playerLoaded: false,
  };



  componentDidMount() {
    const token = Login.getToken();
    if (!token) {
      Login.logInWithSpotify();
    } else {
      this.setState({ token: token });
      this.props.setToken(token);
      this.props.fetchUser();
    }
  }
  render (){
  
      
    let webPlaybackSdkProps = {
      playerName: 'Spotify React Player',
      playerInitialVolume: 1.0,
      playerRefreshRateMs: 1000,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: () => this.state.token,
      onPlayerLoading: () => {},
      onPlayerWaitingForDevice: () => {
        this.setState({ playerLoaded: true });
      },
      onPlayerError: (e) => {
        console.log(e);
      },
      onPlayerDeviceSelected: () => {
        this.setState({ playerLoaded: true });
      },
    };

    return (
      <div className="App">
      <WebPlaybackReact {...webPlaybackSdkProps}>
        <Spinner loading={!this.state.playerLoaded}>
        <div className="left-container">
        <LeftSection />
        </div>
          <div className="main-section-container">     <MainSection />

        </div>
        </Spinner>
        </ WebPlaybackReact>
        </div>
      );
  }}
App.PropTypes = {
  setToken: PropTypes.func,
  fetchUser: PropTypes.func,
}
  const mapStateToProps = (state) => {
    return {
      token: state.sessionReducer.token,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => dispatch(setToken(token)),
    fetchUser: () => dispatch(fetchUser()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);