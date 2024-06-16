// src/hooks/useSpotifyApi.js
import { useState, useEffect } from 'react';
import { fetchUserPlaylists, fetchPlaylistTracks, searchTracks, fetchUserProfile } from '../api/spotify';

/**
 * Custom hook to fetch user's playlists.
 */
export const useUserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const data = await fetchUserPlaylists();
        setPlaylists(data.items);
      } catch (error) {
        setError(error);
      }
    };
    getPlaylists();
  }, []);

  return { playlists, error };
};

/**
 * Custom hook to fetch tracks in a playlist.
 * @param {string} playlistId - The ID of the playlist.
 */
export const usePlaylistTracks = (playlistId) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const data = await fetchPlaylistTracks(playlistId);
        setTracks(data.items);
      } catch (error) {
        setError(error);
      }
    };
    if (playlistId) {
      getTracks();
    }
  }, [playlistId]);

  return { tracks, error };
};

/**
 * Custom hook to search for tracks.
 * @param {string} query - The search query.
 */
export const useSearchTracks = (query) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const search = async () => {
      try {
        const data = await searchTracks(query);
        setResults(data.tracks.items);
      } catch (error) {
        setError(error);
      }
    };
    if (query) {
      search();
    }
  }, [query]);

  return { results, error };
};

/**
 * Custom hook to fetch user's profile.
 */
export const useUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (error) {
        setError(error);
      }
    };
    getProfile();
  }, []);

  return { profile, error };
};
