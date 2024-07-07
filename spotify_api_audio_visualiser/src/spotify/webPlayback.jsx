import React, { useEffect, useState } from 'react';
import { useSpotifyAuth } from '../services/AuthService';

const WebPlayback = () => {
  const { token } = useSpotifyAuth();
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    const initializePlayer = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
      });

      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      player.connect();

      setPlayer(player);

      return () => {
        player.disconnect();
      };
    };

    const waitForSpotify = () => {
      return new Promise((resolve) => {
        if (window.Spotify) {
          resolve();
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve();
          };
        }
      });
    };

    waitForSpotify().then(initializePlayer);

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [token]);


};

export default WebPlayback;
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
// import { setCurrentTrack, setIsPlaying, setTrackPosition, setSpotifyPlayer } from '../redux/actions/playerActions';
// import {setActiveDevice,setDeviceId } from '../redux/actions/sessionActions';
// class WebPlayback extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       spotifyPlayer: null,
//     };
//     this.webPlaybackInstance = null;
//     this.statePollingInterval = null;
//     this.deviceSelectedInterval = null;
//   }

//   componentDidMount() {
//     this.initializePlayer();
//   }

//   componentWillUnmount() {
//     this.clearStatePolling();
//     clearInterval(this.deviceSelectedInterval);
//   }

//   initializePlayer = () => {
//     const player = new window.Spotify.Player({
//       name: 'Web Playback SDK',
//       getOAuthToken: cb => { cb(this.props.token); },
//     });

//     player.addListener('ready', ({ device_id }) => {
//       this.props.setDeviceId(device_id);
//     });

//     player.addListener('player_state_changed', state => {
//       if (state) {
//         this.props.setCurrentTrack(state.track_window.current_track);
//         this.props.setIsPlaying(!state.paused);
//         this.props.setTrackPosition(state.position);
//       }
//     });

//     player.connect();
//     this.setState({ spotifyPlayer: player });
//     this.webPlaybackInstance = player;
//   }

//   waitForSpotify() {
//     return new Promise(resolve => {
//       if ('Spotify' in window) {
//         resolve();
//       } else {
//         window.onSpotifyWebPlaybackSDKReady = () => {
//           resolve();
//         };
//       }
//     });
//   }

//   waitForDeviceToBeSelected() {
//     return new Promise(resolve => {
//       this.deviceSelectedInterval = setInterval(() => {
//         if (this.webPlaybackInstance) {
//           this.webPlaybackInstance.getCurrentState().then(state => {
//             if (state !== null) {
//               this.startStatePolling();
//               clearInterval(this.deviceSelectedInterval);
//               resolve(state);
//             }
//           });
//         }
//       });
//     });
//   }

//   startStatePolling() {
//     this.statePollingInterval = setInterval(() => {
//       this.webPlaybackInstance.getCurrentState().then(state => {
//         this.handleState(state);
//       });
//     }, this.props.playerRefreshRateMs || 1000);
//   }

//   clearStatePolling() {
//     clearInterval(this.statePollingInterval);
//   }

//   handleState = (state) => {
//     // Handle state logic here
//   }

//   async setupWebPlaybackEvents() {
//     let { Player } = window.Spotify;
//     this.webPlaybackInstance = new Player({
//       name: this.props.playerName,
//       volume: this.props.playerInitialVolume,
//       getOAuthToken: async callback => {
//         if (typeof this.props.onPlayerRequestAccessToken !== 'undefined') {
//           let userAccessToken = await this.props.onPlayerRequestAccessToken();
//           callback(userAccessToken);
//         }
//       }
//     });

//     // Event listeners setup

//     if (this.props.playerAutoConnect) {
//       this.webPlaybackInstance.connect();
//     }
//   }

//   setupWaitingForDevice() {
//     return new Promise(resolve => {
//       this.webPlaybackInstance.on('ready', data => {
//         resolve(data);
//       });
//     });
//   }

//   async initializeWebPlayback() {

//     await this.waitForSpotify();
//     await this.setupWebPlaybackEvents();

//     let device_data = await this.setupWaitingForDevice();
//     this.props.onPlayerWaitingForDevice(device_data);

//     await this.waitForDeviceToBeSelected();
//     this.props.onPlayerDeviceSelected();
//   }

//   render() {
//     return null;
//   }
// }

// const mapDispatchToProps = {
//   setCurrentTrack,
//   setIsPlaying,
//   setTrackPosition,
//   setDeviceId,
//   setActiveDevice,
//   setSpotifyPlayer,
// };

// export default connect(null, mapDispatchToProps)(WebPlayback);