// src/spotify/login.js

const client_id = "1f42356ed83f46cc9ffd35c525fc8541";
const redirect_uri = "http://localhost:3000";
const LoginButton = React.forwardRef((props, loginRef) => {

});
export default {
  LoginRef: createRef(),
  logInWithSpotify: () => {
    let scopes = [
      'streaming',
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'user-library-read',
      'user-library-modify',
      'user-read-playback-state',
      'user-modify-playback-state'
    ].join(' ');



    window.location = [
      'https://accounts.spotify.com/authorize',
      `?client_id=${client_id}`,
      `&redirect_uri=${redirect_uri}`,
      `&scope=${scopes}`,
      '&response_type=token',
      '&show_dialog=true',
    ].join('');
  },

  getToken: () => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    window.location.hash = '';
    return hashParams.access_token;
  },
};

const getToken = () => {
  let hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  window.location.hash = "";
  return hashParams.access_token;
};

