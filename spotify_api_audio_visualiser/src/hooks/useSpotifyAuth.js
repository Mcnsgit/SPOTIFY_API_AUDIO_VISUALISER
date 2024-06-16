// src/hooks/useSpotifyAuth.js
import { useEffect } from 'react';
import { extractTokenFromUrl, storeAccessToken } from '../helpers/auth';

/**
 * Custom hook to handle Spotify authentication flow.
 */


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
