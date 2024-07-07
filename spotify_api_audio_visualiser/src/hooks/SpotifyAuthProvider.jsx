// src/hooks/useSpotifyAuth.js
import { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import { extractTokenFromUrl, storeAccessToken, clearAccessToken } from '../helpers/auth';
 
const SpotifyAuthContext = createContext();
export const useSpotifyAuth = () => useContext(SpotifyAuthContext);
/**
 * Custom hook to handle Spotify authentication flow.
 */

const initialState = {
  token: null,
  user: null,
  error: null,
  playlists: [],
  loading: false,
  playbackState: null,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, token: action.payload.accessToken, error: null };
    case "LOGIN_FAILURE":
      return { ...state, error: action.payload.error, token: null };
    case "LOGOUT":
      return { ...state, token: null, user: null, error: null };
    case "REFRESH_TOKEN_SUCCESS":
      return { ...state, token: action.payload.accessToken, error: null };
    case "SET_USER_PROFILE":
      return { ...state, user: action.payload.profile };
      case 'SET_TOKEN':
      return { ...state, token: action.payload, error: null };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, token: null };
    case 'SET_PLAYLISTS':
      return { ...state, playlists: action.payload };
    case 'LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PLAYBACK_STATE':
      return { ...state, playbackState: action.payload };
    default:
      return state;
  }
};

const SpotifyAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const action = AuthService.handleAuthCallback();
    dispatch(action);
  }, []);

  const login = () => AuthService.login();

  const logout = () => {
    dispatch(AuthService.logout());
  };

  const refreshToken = async () => {
    try {
      const refresh_token = await AuthService.refreshToken();
      dispatch({ type: "REFRESH_TOKEN_SUCCESS", payload: { accessToken: refresh_token } });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: { error: error.message } });
    }
  };

  const value = {
    ...state,
    login,
    logout,
    refreshToken,
  };

  return (
    <SpotifyAuthContext.Provider value={value}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export const useAuth = () => {
  const { dispatch } = useSpotifyAuth();
  useEffect(() => {
    const token = extractTokenFromUrl();
    if (token) {
      storeAccessToken(token);
      dispatch({ type: 'SET_TOKEN', token });
    }
  }, [dispatch]);

  const logout = () => {
    clearAccessToken();
    dispatch({ type: 'SET_TOKEN', payload: null });
  };

  return { logout };
};


//     const token = extractTokenFromUrl();
//     if (token) {
//       storeAccessToken(token);
//       window.location.hash = ''; // Clear the hash from the URL.

//     }


export { SpotifyAuthProvider};


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

  const client_id = import.meta.env.VITE_CLIENT_ID;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

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