import { createContext, useContext, useReducer, useEffect } from 'react';
import instance from '../utils/axios';
import { extractTokenFromUrl, storeAccessToken, clearAccessToken } from '../helpers/auth';

const SpotifyAuthContext = createContext();

export const useSpotifyAuth = () => useContext(SpotifyAuthContext);


const CLIENT_ID = "1f42356ed83f46cc9ffd35c525fc8541";
const REDIRECT_URI = "http://localhost:3000";
const SCOPES = [
  "streaming",
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state"
].join(" ");

const initialState = {
  token: null,
  user: null,
  error: null,
  playlists: [],
  loading: false,
  playbackState: null,
};

const authReducer = (state, action) => {
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
class AuthService {
  static login() {
    window.location = [
      "https://accounts.spotify.com/authorize",
      `?client_id=${CLIENT_ID}`,
      `&redirect_uri=${REDIRECT_URI}`,
      `&scope=${SCOPES}`,
      "&response_type=token",
      "&show_dialog=true",
    ].join("");
  }

  static logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return { type: "LOGOUT" };
  }

  static getToken() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    window.location.hash = "";
    return hashParams.access_token;
  }

  static getTokenFromUrl() {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
    window.location.hash = '';
    return hash.access_token;
  }

  static handleAuthCallback() {
    const token = extractTokenFromUrl();
    if (token) {
      storeAccessToken(token);
      return { 
        type: "LOGIN_SUCCESS", 
        payload: { accessToken: token } 
      };
    }
    return { 
      type: "LOGIN_FAILURE", 
      payload: { error: "No token found in URL" } 
    };
  }

  static async refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    const url = 'https://accounts.spotify.com/api/token';
    try {
      const response = await instance.post(url, new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: CLIENT_ID,
      }));
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Error refreshing token', error);
      throw error;
    }
  }
}

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
      const newToken = await AuthService.refreshToken();
      dispatch({ type: "REFRESH_TOKEN_SUCCESS", payload: { accessToken: newToken } });
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

export { AuthService, SpotifyAuthProvider };