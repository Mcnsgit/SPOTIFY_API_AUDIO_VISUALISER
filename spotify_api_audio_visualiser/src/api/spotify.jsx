// src/api/spotify.js
import axios from "axios";

// Base URL for Spotify API
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

/**
 * Get the access token from local storage or other storage mechanism.
 */
const getAccessToken = () => {
	return localStorage.getItem("spotify_access_token");
};

/**
 * Make a GET request to the Spotify API.
 * @param {string} endpoint - The API endpoint to call.
 * @param {object} [params={}] - Query parameters for the request.
 */
const get = async (endpoint, params = {}) => {
	const token = getAccessToken();
	try {
		const response = await axios.get(`${SPOTIFY_BASE_URL}${endpoint}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params,
		});
		return response.data;
	} catch (error) {
		console.error("Spotify API GET request failed:", error);
		throw error;
	}
};

/**
 * Fetch user's playlists.
 */
export const fetchUserPlaylists = () => get("/me/playlists");

/**
 * Fetch tracks in a playlist.
 * @param {string} playlistId - The ID of the playlist.
 */
export const fetchPlaylistTracks = (playlistId) => get(`/playlists/${playlistId}/tracks`);

/**
 * Search for tracks.
 * @param {string} query - The search query.
 */
export const searchTracks = (query, market, limit = 20, offset = 0) => {
	return get("/search", { q: query, type: "track", market, limit, offset });
};
/**
 * Fetch user's profile information.
 */
/**
 * Fetch audio analysis for a track.
 * @param {string} trackId - The Spotify ID of the track.
 */
export const getAudioApiAnalysis = (trackId) => get(`/audio-analysis/${trackId}`);

/**
 * Fetch audio features for a track.
 * @param {string} trackId - The Spotify ID of the track.
 */
export const getAudioApiFeatures = (trackId) => get(`/audio-features/${trackId}`);

/**
 * Fetch audio features for multiple tracks.
 * @param {string} trackIds - Comma-separated Spotify IDs of the tracks.
 */
export const getMultipleAudioApiFeatures = (trackIds) => get("/audio-features", { ids: trackIds });

/**
 * Fetch user's profile information.
 */
export const fetchUserProfile = () => get("/me");