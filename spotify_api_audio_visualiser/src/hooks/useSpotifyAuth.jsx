// src/hooks/useSpotifyAuth.js
import { useEffect } from 'react';
import { extractTokenFromUrl, storeAccessToken } from '../helpers/auth';
import { useSpotifyContext} from '../context/SpotifyContext.jsx';

/**
 * Custom hook to handle Spotify authentication flow.
 */

export const useAuth = () => {
  const { dispacth } = useSpotifyContext();
  useEffect(() => {
    const token = extractTokenFromUrl();
    if (token) {
      storeAccessToken(token);
      dispacth({ type: 'SET_TOKEN', token });
    }
  }, [dispacth]);

const logout = () => {
  clearAccessToken();
  dispacth({ type: 'SET_TOKEN', payload: null });
};

return { logout };
};

const useSpotifyAuth = () => {
  useEffect(() => {
    const token = extractTokenFromUrl();
    if (token) {
      storeAccessToken(token);
      window.location.hash = ''; // Clear the hash from the URL.
    }
  }, []);
};

export default useSpotifyAuth;


const logInWithSpotify = () => {
  const scopes = [
    'streaming',
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state'
  ].join(' ');

  const client_id = 'YOUR_CLIENT_ID'; // Add your Spotify client ID
  const redirect_uri = 'YOUR_REDIRECT_URI'; // Add your redirect URI

  window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;
};

const getToken = () => {
  const hashParams = {};
  const queryString = window.location.hash.substring(1);
  const urlParams = new URLSearchParams(queryString);

  for (let pair of urlParams.entries()) {
    hashParams[pair[0]] = decodeURIComponent(pair[1]);
  }

  window.location.hash = '';
  return hashParams.access_token;
};

export { logInWithSpotify, getToken };