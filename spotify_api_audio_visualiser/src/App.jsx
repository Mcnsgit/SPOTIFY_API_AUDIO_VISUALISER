import React, { Component, useEffect, useState,useRef } from 'react';
import { useSelector, useDispatch,connect} from 'react-redux';
import './App.scss';
import axios from 'axios';
import MainSection from './components/MainSection/MainSection.jsx';
import { AuthService } from './services/AuthService';
import spotifyWebApi from 'spotify-web-api-js';
import SpotifyLogo from './assets/spotify-icon-black.png';
import LeftSection from './components/Layout/SideMenu/leftSection.jsx';
import { SpotifyAuthProvider, useSpotifyAuth,logInWithSpotify, getToken} from './hooks/SpotifyAuthProvider.jsx';
import { fetchTracks } from './redux/actions/libraryActions.js';
import { useNavigate, Route,Routes } from "react-router-dom";
import { setToken } from './redux/actions/sessionActions';
import { fetchUser } from './redux/actions/userActions';
import Spinner from './components/common/spinner/spinner';
import WebPlayback from './spotify/webPlayback'
import {Container } from 'react-bootstrap'
// import {logInWithSpotify } from './spotify/login';
import Footer from './components/Layout/Footer/Footer.jsx';
import ThreeScene from "./components/MainSection/Player/Visualiser/Visuals/ThreeScene";
import GLShaderSample from "./components/MainSection/Player/Visualiser/Visuals/GlShaderSample.jsx";
import Buttons from './components/common/buttons/Buttons';
import WarpingScene from "./components/MainSection/Player/Visualiser/Visuals/WrapingScene.jsx";
import { getAccessToken, fetchUserProfile,  } from './api/spotify';
import Player from './components/MainSection/Player/Player.jsx';
import instance from './utils/axios';

const spotifyApi = new spotifyWebApi();

const App = ({ token }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({
    name: "",
    image: "",
    artist: ""
  });
  const loginRef = useRef();
  
  const dispatch = useDispatch();
  
  const getHashParams = () => {
    const hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  useEffect(() => {
    const params = getHashParams();
    if (params.access_token) {
      spotifyApi.setAccessToken(params.access_token);
      setAccessToken(params.access_token);
      setLoggedIn(true);
      dispatch(setToken(params.access_token));
      dispatch(fetchUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      fetchUserDetails();
      fetchTracks();
    }
  }, [accessToken]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (loggedIn) {
        fetchNowPlaying();
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [loggedIn]);

  const handleLoginClick = () => {
    AuthService.login();
  };

  const fetchUserDetails = async () => {
    try {
      const response = await instance.get('/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      console.log('User details', response.data);
      dispatch({ type: 'SET_USER', user: response.data });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchTracks = async () => {
    try {
      const response = await instance.get('me/tracks', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTracks(response.data.items.map(item => item.track));
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const response = await instance.get('/me/player', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      console.log('Now playing', response.data);
      if (response.data && response.data.item) {
        setNowPlaying({
          name: response.data.item.name,
          image: response.data.item.album.images[0]?.url,
          artist: response.data.item.artists[0]?.name
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await AuthService.refreshToken();
          if (newAccessToken) {
            spotifyApi.setAccessToken(newAccessToken);
            fetchNowPlaying(); // Retry fetching now playing with the new access token
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        console.error("Error getting playback state:", error);
      }
    }
  };

  return (
    <div className="App">
      <div className="login-blur" id={loggedIn ? "" : "blur"}>
        <div id='App-container' className='App-container'>
          <div className='left'>
          <LeftSection />
          </div>
          <div className='main-section'>
          <MainSection />
          <div className="musicPlayerContainer" id='musicPlayerContainer'>
            <div id="musicInfo">
              <div>
                <p id="currentTitle">{nowPlaying.name}</p>
                <p id="artistName">{nowPlaying.artist}</p>
              </div>
            </div>
            {nowPlaying.image && <img src={nowPlaying.image} style={{ width: 100 }} alt="Album cover" />}
          </div>
        </div>
      </div>
            </div>
      {!loggedIn && (
        <div id="logInPrompt">
          <div id="greenSquare">
            <img src={SpotifyLogo} id="spotify-logo" alt="Spotify logo" />
          </div>
          <h1>Please Login With Spotify And Play A Song To Access The Visualizer!</h1>
          <button ref={loginRef} onClick={handleLoginClick}>Login with Spotify</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(App);