import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.scss';

import { setToken } from './redux/actions/sessionActions';
import { fetchUser } from './redux/actions/userActions';

import Spinner from './components/spinner/spinner';
import Login from './spotify/login';
import WebPlaybackReact from './spotify/webPlayback';
import MainSection from './components/Layout/MainSection/MainSection';

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
        <WebPlaybackReact {...webPlaybackSdkProps} > 

        <Spinner loading={!this.state.playerLoaded} />
        <MainSection />


        </ WebPlaybackReact>
        </div>
      );

    

  }}

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