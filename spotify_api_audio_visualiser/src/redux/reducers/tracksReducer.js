const initialState = {
	fetchTracksPending: true,
	trackPlaying: false,
	timeElapsed: 0,
	trackId: 0,
	viewType: "tracks",
	trackPaused: true,
	tracks: [],
	searchTracksPending: false,
	fetchTracksError: false,
	fetchPlaylistTracksPending: false,
	fetchArtistTracksPending: false,
	fetchPlaylistTracksError: false,
	fetchArtistTracksError: false,
	trackDetails: null,
};

const tracksReducer = (state = initialState, action) => {
	switch (action.type) {
	case "UPDATE_VIEW_TYPE":
		return {
			...state,
			viewType: action.payload,
		};
	case "FETCH_SONGS_PENDING":
		return {
			...state,
			fetchTracksPending: true,
		};
	case "FETCH_SONGS_SUCCESS":
		return {
			...state,
			tracks: action.payload,
			fetchTracksError: false,
			fetchTracksPending: false,
			viewType: "tracks",
		};
	case "FETCH_SONGS_ERROR":
		return {
			...state,
			fetchTracksError: true,
			fetchTracksPending: false,
		};
	case "SEARCH_SONGS_PENDING":
		return {
			...state,
			searchTracksPending: true,
		};
	case "SEARCH_SONGS_SUCCESS":
		return {
			...state,
			tracks: action.payload,
			searchTracksError: false,
			searchTracksPending: false,
			viewType: "search",
		};
	case "SEARCH_SONGS_ERROR":
		return {
			...state,
			searchTracksError: true,
			searchTracksPending: false,
		};
	case "FETCH_RECENTLY_PLAYED_PENDING":
		return {
			...state,
			fetchTracksPending: true,
		};
	case "FETCH_RECENTLY_PLAYED_SUCCESS":
		return {
			...state,
			tracks: action.payload,
			viewType: "Recently Played",
			fetchTracksError: false,
			fetchTracksPending: false,
		};
	case "FETCH_RECENTLY_PLAYED_ERROR":
		return {
			...state,
			fetchTracksError: true,
			fetchTracksPending: false,
		};
	case "FETCH_PLAYLIST_SONGS_PENDING":
		return {
			...state,
			fetchPlaylistTracksPending: true,
		};
	case "FETCH_PLAYLIST_SONGS_SUCCESS":
		return {
			...state,
			tracks: action.payload,
			viewType: "playlist",
			fetchPlaylistTracksError: false,
			fetchPlaylistTracksPending: false,
		};
	case "FETCH_PLAYLIST_SONGS_ERROR":
		return {
			...state,
			fetchPlaylistTracksError: true,
			fetchPlaylistTracksPending: false,
		};
	case "FETCH_ARTIST_SONGS_PENDING":
		return {
			...state,
			fetchArtistTracksPending: true,
		};
	case "FETCH_ARTIST_SONGS_SUCCESS":
		return {
			...state,
			tracks: action.payload,
			viewType: "Artist",
			fetchArtistTracksError: false,
			fetchArtistTracksPending: false,
		};
	case "FETCH_ARTIST_SONGS_ERROR":
		return {
			...state,
			fetchArtistTracksError: true,
			fetchArtistTracksPending: false,
		};
	case "PLAY_SONG":
		return {
			...state,
			trackPlaying: true,
			trackDetails: action.payload,
			trackId: action.payload.id,
			timeElapsed: 0,
			trackPaused: false,
		};
	case "STOP_SONG":
		return {
			...state,
			trackPlaying: false,
			trackDetails: null,
			timeElapsed: 0,
			trackPaused: true,
		};
	case "PAUSE_SONG":
		return {
			...state,
			trackPaused: true,
		};
	case "RESUME_SONG":
		return {
			...state,
			trackPaused: false,
		};
	case "INCREASE_SONG_TIME":
		return {
			...state,
			timeElapsed: action.payload,
		};
	default:
		return state;
	}
};

export default tracksReducer;
