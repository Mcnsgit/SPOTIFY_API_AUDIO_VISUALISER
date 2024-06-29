
import { reducerCases } from "../common/constants.js";

const initialState = {
	token: null,
	playlists: [],
	userInfo: null,
	selectedPlaylistId: "2IK0aSXvhYwrF9NcsVclPT",
	selectedPlaylist: null,
	playerState: false,
	discover_weekly: null,
	followed_artists: null,
	saved_albums: null,
	top_artists: null,
	top_tracks: null,
	user: null,
	user_playlists: null,
	currentlyPlaying: null,
	audioFeatures: null,
	audioAnalysis: null,
	error: null,
	loading: false,
	errorInfo: null,
	loadingInfo: false,
	multipleAudioFeatures: null,
	multipleAudioAnalysis: null,
	multipleError: null,
	multipleLoading: false,
	multipleErrorInfo: null,
	multipleLoadingInfo: false,
	audioApiAnalysis: null,
	audioApiAnalysisLoading: false,
	audioApiAnalysisError: null,
	audioApiFeatures: null,
	audioApiFeaturesLoading: false,
	audioApiFeaturesError: null,
	multipleAudioApiFeatures: null,
	multipleAudioApiFeaturesLoading: false,
	multipleAudioApiFeaturesError: null,
	displayPlayer: false,
	displayPlayerError: false,
	displayPlayerLoading: false,
	displayPlayerInfo: false,
	displayPlayerInfoError: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case reducerCases.SET_TOKEN: {
		return {
			...state,
			token: action.token,
		};
	}
	case reducerCases.SET_PLAYLISTS: {
		return {
			...state,
			playlists: action.playlists,
		};
	}
	case reducerCases.SET_USER: {
		return {
			...state,
			userInfo: action.userInfo,
		};
	}
	case reducerCases.SET_PLAYLIST: {
		return {
			...state,
			selectedPlaylist: action.selectedPlaylist,
		};
	}
	case reducerCases.SET_PLAYING: {
		return {
			...state,
			currentlyPlaying: action.currentlyPlaying,
		};
	}
	case reducerCases.SET_PLAYER_STATE: {
		return {
			...state,
			playerState: action.playerState,
		};
	}
	case reducerCases.SET_PLAYLIST_ID: {
		return {
			...state,
			selectedPlaylistId: action.selectedPlaylistId,
		};
	}
	case "SET_USER":
		return {
			...state,
			user: action.payload,
		};
	case "SET_PLAYLISTS":
		return {
			...state,
			user_playlists: action.payload,
		};
	case "SET_TOP_ARTISTS":
		return {
			...state,
			top_artists: action.payload,
		};
	case "SET_TOP_TRACKS":
		return {
			...state,
			top_tracks: action.payload,
		};
	case "SET_DISCOVER_WEEKLY":
		return {
			...state,
			discover_weekly: action.payload,
		};
	case "SET_SAVED_ALBUMS":
		return {
			...state,
			saved_albums: action.payload,
		};
	case "SET_FOLLOWED_ARTISTS":
		return {
			...state,
			followed_artists: action.payload,
		};
	case "SET_USER_PLAYLISTS":
		return {
			...state,
			user_playlists: action.payload,
		};
	case "SET_ERROR":
		return {
			...state,
			error: action.payload,
		};
	case "SET_LOADING":
		return {
			...state,
			loading: action.payload,
		};
	case "SET_ERROR_INFO":
		return {
			...state,
			errorInfo: action.payload,
		};
	case "SET_LOADING_INFO":
		return {
			...state,
			loadingInfo: action.payload,
		};
	case "SET_AUDIO_FEATURES":
		return {
			...state,
			audioFeatures: action.payload,
		};
	case "SET_AUDIO_ANALYSIS":
		return {
			...state,
			audioAnalysis: action.payload,
		};
	case "SET_CURRENTLY_PLAYING":
		return {
			...state,
			currentlyPlaying: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_FEATURES":
		return {
			...state,
			multipleAudioFeatures: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_ANALYSIS":
		return {
			...state,
			multipleAudioAnalysis: action.payload,
		};
	case "SET_MULTIPLE_ERROR":
		return {
			...state,
			multipleError: action.payload,
		};
	case "SET_MULTIPLE_LOADING":
		return {
			...state,
			multipleLoading: action.payload,
		};
	case "SET_MULTIPLE_ERROR_INFO":
		return {
			...state,
			multipleErrorInfo: action.payload,
		};
	case "SET_MULTIPLE_LOADING_INFO":
		return {
			...state,
			multipleLoadingInfo: action.payload,
		};
	case "SET_AUDIO_API_ANALYSIS":
		return {
			...state,
			audioApiAnalysis: action.payload,
		};
	case "SET_AUDIO_API_ANALYSIS_LOADING":
		return {
			...state,
			audioApiAnalysisLoading: action.payload,
		};
	case "SET_AUDIO_API_ANALYSIS_ERROR":
		return {
			...state,
			audioApiAnalysisError: action.payload,
		};
	case "SET_AUDIO_API_FEATURES":
		return {
			...state,
			audioApiFeatures: action.payload,
		};
	case "SET_AUDIO_API_FEATURES_LOADING":
		return {
			...state,
			audioApiFeaturesLoading: action.payload,
		};
	case "SET_AUDIO_API_FEATURES_ERROR":
		return {
			...state,
			audioApiFeaturesError: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_API_FEATURES":
		return {
			...state,
			multipleAudioApiFeatures: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_API_FEATURES_LOADING":
		return {
			...state,
			multipleAudioApiFeaturesLoading: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_API_FEATURES_ERROR":
		return {
			...state,
			multipleAudioApiFeaturesError: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_API_ANALYSIS":
		return {
			...state,
			multipleAudioApiAnalysis: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_API_ANALYSIS_LOADING":
		return {
			...state,
			multipleAudioApiAnalysisLoading: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_API_ANALYSIS_ERROR":
		return {
			...state,
			multipleAudioApiAnalysisError: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_API_ANALYSIS_INFO":
		return {
			...state,
			multipleAudioApiAnalysisInfo: action.payload,
		};
	case "SET_MULTIPLE_AUDIO_API_FEATURES_INFO":
		return {
			...state,
			multipleAudioApiFeaturesInfo: action.payload,
		};
	default:
		return state;
	}
};

export { initialState, reducer };

export default reducer;


