// src/hooks/useSpotifyApi.js
import { useState, useEffect } from "react";
import { fetchUserPlaylists, fetchPlaylistTracks, searchTracks, fetchUserProfile } from "../api/spotify";
import { useSpotifyContext } from "../context/SpotifyContext";
/**
 * Custom hook to fetch user's playlists.
 */
export const useUserPlaylists = () => {
	const { state, dispatch } = useSpotifyContext();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const loadPlaylists = async () => {
			setLoading(true);
			const playlists = await fetchUserPlaylists();
			dispatch({ type: "SET_PLAYLISTS", payload: playlists });
			setLoading(false);
		};
		loadPlaylists();
	}, [dispatch]);

	return { playlists: state.playlists, loading };
};

export const usePlaylistTracks = (playlistId) => {
	const [tracks, setTracks] = useState([]);
	useEffect(() => {
		const loadTracks = async () => {
			const tracks = await fetchPlaylistTracks(playlistId);
			setTracks(tracks);
		};
		loadTracks();
	}, [playlistId]);

	return tracks;
};

export const useSearchTracks = (query) => {
	const [results, setResults] = useState([]);
	useEffect(() => {
		const search = async () => {
			const results = await searchTracks(query);
			setResults(results);
		};
		search();
	}, [query]);

	return results;
};

export const useUserProfile = () => {
	const [profile, setProfile] = useState(null);
	useEffect(() => {
		const loadProfile = async () => {
			const profile = await fetchUserProfile();
			setProfile(profile);
		};
		loadProfile();
	}, []);

	return profile;
};

