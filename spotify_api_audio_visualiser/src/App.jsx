import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Route,Routes } from "react-router-dom";
import { useSelector, useDispatch,connect} from 'react-redux';
import { setToken } from './redux/actions/sessionActions';
import { fetchUser } from './redux/actions/userActions';
import Spinner from './components/common/spinner/spinner';
import Dashboard from './components/MainSection/Dashboard/Dashboard';
import './App.scss';
import { SpotifyAuthProvider } from './services/AuthService';
import WebPlayback from './spotify/webPlayback'
import {Container } from 'react-bootstrap'
import Login from './spotify/login';
import { logInWithSpotify, getToken } from './hooks/useSpotifyAuth.jsx';

// const spotifyApi = new spotifyWebApi();

import ThreeScene from "./components/MainSection/Player/Visualiser/Visuals/ThreeScene";
import GLShaderSample from "./components/MainSection/Player/Visualiser/Visuals/GlShaderSample.jsx";


import WarpingScene from "./components/MainSection/Player/Visualiser/Visuals/WrapingScene.jsx";

import spotifyWebApi from 'spotify-web-api-js';
import spotify from './assets/spotify-icon-black.png';
const spotifyApi = new spotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    console.log(params);
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name:"Not Checked",
        image: "",
        artist: ""
      },
      currentStats: {
        currentLoudness: null
      },
      width: 0, 
      height: 0,
      currentVisualization: 0
    }
    if (params.access_token) {
      spotifyApi.setAccessToken(params.access_token);
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.changeRenderButtons = this.changeRenderButtons.bind(this);

  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  componentDidMount() {
    if (this.state.loggedIn == true) {
      this.intervalId = setInterval(() => this.getNowPlaying(), 250);
      this.getNowPlaying(); 
    }
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    window.removeEventListener('resize', this.updateWindowDimensions);

  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        const timeStampSeconds = response.progress_ms / 1000;
        spotifyApi.getAudioAnalysisForTrack(response.item.id)
        .then((analysis) => {
          const result = analysis.segments.filter(trackDataPoint => trackDataPoint.start + trackDataPoint.duration > timeStampSeconds);
          this.setState({
            currentStats: {
              currentLoudness: result[0].loudness_max,
            }
          })        
        })
        this.setState({
          nowPlaying: {
            name:response.item.name,
            image: response.item.album.images[0].url,
            artist: response.item.artists[0].name
          }
        })
      })
    }

    changeRenderButtons = event => {
      console.log(event);
      this.setState({ currentVisualization: parseInt(event.target.id) })
    };

  render() {
    const isLoggedIn = this.state.loggedIn;
    return (
      <div className="App">
        <div id={isLoggedIn
        ? ""
        : "blur"
        }>
          {(() => {
            console.log(this.state.currentVisualization);
            switch (this.state.currentVisualization) {
              case 0:
                return <GLShaderSample currentLoudness = {this.state.currentStats.currentLoudness} screenWidth={this.state.width} screenHeight={this.state.height} albumArtwork={this.state.nowPlaying.image} whichSketch={this.state.currentVisualization}></GLShaderSample>
              case 1:
                return <GLShaderSample currentLoudness = {this.state.currentStats.currentLoudness} screenWidth={this.state.width} screenHeight={this.state.height} albumArtwork={this.state.nowPlaying.image} whichSketch={this.state.currentVisualization}></GLShaderSample> 
              case 2:
                return <GLShaderSample currentLoudness = {this.state.currentStats.currentLoudness} screenWidth={this.state.width} screenHeight={this.state.height} albumArtwork={this.state.nowPlaying.image} whichSketch={this.state.currentVisualization}></GLShaderSample>
              case 3:
                return <GLShaderSample currentLoudness = {this.state.currentStats.currentLoudness} screenWidth={this.state.width} screenHeight={this.state.height} albumArtwork={this.state.nowPlaying.image} whichSketch={this.state.currentVisualization}></GLShaderSample>
              case 4:
                return <ThreeScene cubesNumber = {20} screenWidth={this.state.width} screenHeight={this.state.height} currentLoudness = {this.state.currentStats.currentLoudness}></ThreeScene>

              }
          })()}
          <Buttons changeButtonRender={this.changeRenderButtons} albumArtwork={this.state.nowPlaying.image}></Buttons>
          <div id="musicPlayerContainer">
            <div id="musicInfo">
              <div>
                <p id="currentTitle">
                  {this.state.nowPlaying.name}
                </p>
                <p id="artistName">
                  {this.state.nowPlaying.artist}
                </p>
              </div>
              </div>
              <img src={this.state.nowPlaying.image} style={{width: 100}}/>

          </div>
        </div>
        {this.state.loggedIn == false && 
          <div id="logInPrompt">
              <div id="greenSquare">
                <img src={SpotifyLogo} id="spotify-logo"/>
              </div>
              <h1>Please Login With Spotify And Play A Song To Access The Visualizer!</h1>
                <button>
                  <a href="http://localhost:3000">
                    Login With Spotify
                  </a>
                </button>
          </div>
        }

        {/* <WarpingScene></WarpingScene> */}
        {/* <ThreeScene cubesNumber = {6} sizeSphere = {this.state.currentStats.currentLoudness}></ThreeScene> */}
      </div>
    );
  }
}

export default App;
// window.onSpotifyWebPlaybackSDKReady = () => {};

// class App extends Component {
//   constructor(props) {
//     super(props);
//     const params = this.getHashParams();
//     console.log(params);
//     this.state = {
//       loggedIn: params.access_token ? true : false,
//       nowPlaying: {
//         name:"Not Checked",
//         image: "",
//         artist: ""
//       },
//       currentStats: {
//         currentLoudness: null
//       },
//       width: 0, 
//       height: 0,
//       currentVisualization: 0
//     }
//     if (params.access_token) {
//       spotifyApi.setAccessToken(params.access_token);
//     }
//     getHashParams() {
//       var hashParams = {};
//       var e, r = /([^&;=]+)=?([^&;]*)/g,
//           q = window.location.hash.substring(1);
//       while ( e = r.exec(q)) {
//          hashParams[e[1]] = decodeURIComponent(e[2]);
//       }
//       return hashParams;
//     }

  
//     componentDidMount() {
//       if (this.state.loggedIn == true) {
//         this.intervalId = setInterval(() => this.getNowPlaying(), 250);
//         this.getNowPlaying(); 
//       }

//     // let webPlaybackSdkProps = {
//     //   playerName: 'Spotify React Player',
//     //   playerInitialVolume: 1.0,
//     //   playerRefreshRateMs: 1000,
//     //   playerAutoConnect: true,
//     //   onPlayerRequestAccessToken: () => this.state.token,
//     //   onPlayerLoading: () => {},
//     //   onPlayerWaitingForDevice: () => {
//     //     this.setState({ playerLoaded: true });
//     //   },
//     //   onPlayerError: (e) => {
//     //     console.log(e);
//     //   },
//     //   onPlayerDeviceSelected: () => {
//     //     this.setState({ playerLoaded: true });
//     //   },
//     // };

//     return (
//       <div className="App">
//         <WebPlayback playerName='Spotify React Player'
//         playerInitialVolume={1.0}
//         playerRefreshRateMs={1000}
//         playerAutoConnect={true}
//         onPlayerRequestAccessToken={() => token}
//         onPlayerLoading={() => {}}
//         onPlayerWaitingForDevice={() => {}}
//         onPlayerError={(e) => console.log(e)}
//         onPlayerDeviceSelected={() => {}}
//       > 
//           <Spinner loading={false}>


//             <Dashboard />
//           </Spinner>

//         </ WebPlayback>
//         </div>
//       );
      
      
      
//     }
//     export default App;
    // const mapStateToProps = (state) => {
    //   return {
    //     token: state.sessionReducer.token,
    //   };
    // };
    
    // const mapDispatchToProps = (dispatch) => ({
    //   setToken: (token) => dispatch(setToken(token)),
    //   fetchUser: () => dispatch(fetchUser()),
    // });
    
    // export default connect(mapStateToProps, mapDispatchToProps)(App);
  
// App.propTypes = {
//   loggedIn: propTypes.bool,
//   setToken: propTypes.func,
//   fetchUser:propTypes.func,
// };

// const mapStateToProps = (state) => ({
//   loggedIn: state.sessionReducer.token,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setToken: (token) => dispatch(setToken(token)),
//   fetchUser: () => dispatch(fetchUser()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);
// window.onSpotifyWebPlaybackSDKReady = () => {};

// const App = ( ) => {
// const [loggedIn , setLoggedIn] = useState(false);
// const [nowPlaying, setNowPlaying] = useState({ name: "Not Checked", image: "", artist: "" });
// const [currentStats, setCurrentStats] = useState({ currentLoudness: null });
// const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });


// const dispatch = useDispatch();
// const token = useSelector(state => state.sessionReducer.token);

// useEffect(() => {
//   const params = new URLSearchParams(window.location.hash.substring(1));
//   const accessToken = params.get('access_token');
//   if (accessToken) {
//     spotifyApi.setAccessToken(accessToken);
//     dispatch(setToken(accessToken));
//     setLoggedIn(true);
//   }
// }, [dispatch]);

// useEffect(() => {
//   const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize);
// }, []);

// useEffect(() => {
//   const intervalId = setInterval(() => {
//     if (loggedIn) {
//       getNowPlaying();
//     }
//   }, 1000); // Fetch now playing info every 1 second
//   return () => clearInterval(intervalId);
// }, [loggedIn]);

// const getNowPlaying = async () => {
//   try {
//     const playbackState = await spotifyApi.getMyCurrentPlaybackState();
//     if (playbackState && playbackState.item) {
//       const analysis = await spotifyApi.getAudioAnalysisForTrack(playbackState.item.id);
//       const timeStampSeconds = playbackState.progress_ms / 1000;
//       const result = analysis.segments.find(point => point.start + point.duration > timeStampSeconds);
//       setCurrentStats({ currentLoudness: result?.loudness_max });
//       setNowPlaying({
//         name: playbackState.item.name,
//         image: playbackState.item.album.images[0].url,
//         artist: playbackState.item.artists[0].name
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching now playing:", error);
//   }
// };

// if (!token) {
//   return <Login />;
// }

// return (
//   <SpotifyAuthProvider>
//     <div className="App">
//       <Spinner loading={!loggedIn}>
//         <div id={loggedIn ? "" : "blur"}>
//           <Dashboard />
//         </div>
//       </Spinner>
//       {!loggedIn && (
//         <div id="logInPrompt">
//           <div id="greenSquare"></div>
//           <h1>Please Login With Spotify And Play A Song To Access The Visualizer!</h1>
//           <button>
//             <a href="http://localhost:3001/login">Login With Spotify</a>
//           </button>
//         </div>
//       )}
//     </div>
//   </SpotifyAuthProvider>
// );
// };
