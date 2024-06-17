// src/hooks/useSpotifyAuth.js
import { useEffect } from 'react';
import { extractTokenFromUrl, storeAccessToken } from '../helpers/auth';
import { useSpotifyContext} from '../context/SpotifyContext';

/**
 * Custom hook to handle Spotify authentication flow.
 */

export const useSpotifyAuth = () => {
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
  dispatch({ type: 'SET_TOKEN', payload: null });
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
