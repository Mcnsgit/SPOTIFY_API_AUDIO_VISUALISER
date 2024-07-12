import React, { createContext, useContext, useReducer } from "react";
import propTypes from "prop-types";

const SpotifyContext = createContext();

const initialState = { token: null, user: null, playlists: [], currentPlaylist: null };

const reducer = (state, action ) => {
	switch (action.type) {
		
	case "SET_TOKEN": return { ...state, token: action.payload };
	case "SET_USER": return { ...state, user: action.payload };
	case "SET_PLAYLISTS": return { ...state, playlists: action.payload };
	case "SET_CURRENT_PLAYLIST": return { ...state, currentPlaylist: action.payload };
	default: return state;
	}
};

export const SpotifyProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <SpotifyContext.Provider value={{ state, dispatch }}>{children}</SpotifyContext.Provider>;
};

SpotifyProvider.propTypes = {
	children: propTypes.node.isRequired,
};

export const useSpotifyContext = () => useContext(SpotifyContext);

