import React, { Component, useEffect, useState,useRef } from 'react';
import { useNavigate, Route,Routes } from "react-router-dom";
import { useSelector, useDispatch,connect} from 'react-redux';
import { setToken } from './redux/actions/sessionActions';
import { fetchUser } from './redux/actions/userActions';
import Spinner from './components/common/spinner/spinner';
import WebPlayback from './spotify/webPlayback'
import {Container } from 'react-bootstrap'
// import {logInWithSpotify } from './spotify/login';
import Footer from './components/Layout/Footer/Footer.jsx';
import './App.scss';
import MainSection from './components/MainSection/MainSection.jsx';
import { AuthService } from './services/AuthService';
import { SpotifyAuthProvider, useSpotifyAuth,logInWithSpotify, getToken} from './hooks/SpotifyAuthProvider.jsx';
import ThreeScene from "./components/MainSection/Player/Visualiser/Visuals/ThreeScene";
import GLShaderSample from "./components/MainSection/Player/Visualiser/Visuals/GlShaderSample.jsx";
import Buttons from './components/common/buttons/Buttons';
import WarpingScene from "./components/MainSection/Player/Visualiser/Visuals/WrapingScene.jsx";
import spotifyWebApi from 'spotify-web-api-js';
import SpotifyLogo from './assets/spotify-icon-black.png';

// const spotifyApi = new spotifyWebApi();

const spotifyApi = new spotifyWebApi();


const App = () => {
  const [state, setState] = useState({
    loggedIn: false,
    nowPlaying: {
      name: "",
      image: "",
      artist: ""
    },
    currentStats: {
      currentLoudness: null
    },
    width: window.innerWidth,
    height: window.innerHeight,
    currentVisualization:0
  });
  const { loggedIn,  currentStats, width, height, currentVisualization } = state;
  const loginRef = useRef();
  
  // this.changeRenderButtons = this.changeRenderButtons.bind(this);

  const getHashParams = () => {
    const hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  useEffect(() => {
    const params = getHashParams();
    if (params.access_token) {
      spotifyApi.setAccessToken(params.access_token);
      setState((prevState) => ({
        ...prevState,
        loggedIn: true
      }));
    }

    const updateWindowDimensions = () => {
      setState((prevState) => ({
        ...prevState,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };

    if (loggedIn) {
      const intervalId = setInterval(() => nowPlaying(), 5000);
      nowPlaying();

      window.addEventListener('resize', updateWindowDimensions);

      return () => {
        clearInterval(intervalId);
        window.removeEventListener('resize', updateWindowDimensions);
      };
    }
  }, [loggedIn]);

  const nowPlaying = async () => {
    try{
      const response = await spotifyApi.getMyCurrentPlaybackState();
      if (response && response.item) {
        const timeStampSeconds = response.progress_ms / 1000;
        const analysis = await spotifyApi.getAudioAnalysisForTrack(response.item.id);
        const result = analysis.segments.filter(trackDataPoint => trackDataPoint.start + trackDataPoint.duration > timeStampSeconds);
              this.setState((prevState) => ({
                ...prevState,
                currentStats: {
                  currentLoudness: result[0]?.loudness_max || null,
                },
                nowPlaying: {
                  name: response.item.name,
                  image: response.item.album.images[0].url,
                  artist: response.item.artists[0].name
                }
          }))
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired, refresh token
          try {
          const refresh_token = await AuthService.refreshToken();
          if (refresh_token) {
            spotifyApi.setAccessToken(refresh_token);
            this.getNowPlaying();
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      } else{
          console.error("Error getting playback state:", error);
        }
    }
  }
  // changeRenderButtons(event) {
  //   console.log(event);
  //   this.setState({ currentVisualization: parseInt(event.target.id) });
  // }


  const handleLoginClick = ( ) => {
    logInWithSpotify();
  }
 

    return (
      <div className="App">
        <div className="login-blur" id={loggedIn ? "" : "blur"}>
          <div id='App-container' className='App-container'>
           <MainSection/>
          <div className="musicPlayerContainer" id='musicPlayerContainer'>
            <div id="musicInfo">
              <div>
                <p id="currentTitle">
                  {nowPlaying.name}
                </p>
                <p id="artistName">
                  {nowPlaying.artist}
                </p>
              </div>
            </div>
            <img src={nowPlaying.image} style={{ width: 100 }} />
          </div>
          <div  className='footer' id='footer'>
            <Footer/>
          </div>
            </div>
        </div>
        {!loggedIn && (
          <div id="logInPrompt">
            <div id="greenSquare">
              <img src={SpotifyLogo} id="spotify-logo" />
            </div>
            <h1>Please Login With Spotify And Play A Song To Access The Visualizer!</h1>
            <button ref={loginRef} onClick={handleLoginClick}>Login with Spotify</button>
            </div>
        )}
        {/* <WarpingScene></WarpingScene> */}
        {/* <ThreeScene cubesNumber = {6} sizeSphere = {this.state.currentStats.currentLoudness}></ThreeScene> */}
      </div>
    );
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
  
// App.PropTypes = {
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
