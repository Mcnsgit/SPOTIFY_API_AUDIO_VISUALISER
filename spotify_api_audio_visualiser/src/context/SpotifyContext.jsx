import React, { createContext, useContext, useReducer } from "react";

const SpotifyContext = createContext();

const initialState = { token: null, user: null, playlists: [], currentPlaylist: null };

const reducer = (state, action) => {
	switch (action.type) {
	case "SET_TOKEN": return { ...state, token: action.payload };
	case "SET_USER": return { ...state, user: action.payload };
	case "SET_PLAYLISTS": return { ...state, playlists: action.payload };
	case "SET_CURRENT_PLAYLIST": return { ...state, currentPlaylist: action.payload };
	case "SET_PLAYING": return { ...state, playing: action.payload };
	case "SET_AUDIO_FEATURES": return { ...state, audio_features: action.payload };
	case "SET_AUDIO_ANALYSIS": return { ...state, audio_analysis: action.payload };
	case "SET_MULTIPLE_AUDIO_FEATURES": return { ...state, multiple_audio_features: action.payload };
	case "SET_MULTIPLE_AUDIO_ANALYSIS": return { ...state, multiple_audio_analysis: action.payload };
	case "SET_MULTIPLE_ERROR": return { ...state, multiple_error: action.payload };
	case "SET_MULTIPLE_LOADING": return { ...state, multiple_loading: action.payload };
	case "SET_MULTIPLE_ERROR_INFO": return { ...state, multiple_error_info: action.payload };
	case "SET_MULTIPLE_LOADING_INFO": return { ...state, multiple_loading_info: action.payload };
	case "SET_VOLUME": return { ...state, volume: action.payload };
	default: return state;
	}
};

export const SpotifyProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <SpotifyContext.Provider value={{ state, dispatch }}>{children}</SpotifyContext.Provider>;
};

export const useSpotifyContext = () => useContext(SpotifyContext);
