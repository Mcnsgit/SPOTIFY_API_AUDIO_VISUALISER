

const initialState = {
	tracks: {items:[]},
	fetchTracksError: false,
	fetchTracksPending: false,
	containsCurrent: false
};

export const playlistReducer = (state = initialState, action) => {
	switch (action.type) {
	case "FETCH_SONGS_PENDING":{
		return {
			...state,
			fetchTracksPending: true
		};
	};
  
	case "FETCH_SONGS_SUCCESS":{

		return {
			...state,
			tracks: action.tracks,
			fetchTracksError: false,
			fetchTracksPending: false
		};
	}
  
	case "FETCH_SONGS_ERROR":
		return {
			...state,
			fetchTracksError: true,
			fetchTracksPending: false
		};
  
	case "FETCH_MORE_SONGS_SUCCESS":{
		let items = [...state.tracks.items, ...action.tracks];
		return {
			...state,
			tracks: {
				...state.tracks,
				next: action.next,
				items: items
			}
		};
	}
	case "CONTAINS_CURRENT_SUCCESS":
		return {
			...state,
			containsCurrent: action.contains.data.includes(true)
		};
	case "REMOVE_SONG_SUCCESS":
		return {
			...state,
			containsCurrent: action.current ? false : state.containsCurrent
		};
	case "ADD_SONG_SUCCESS":
		return {
			...state,
			containsCurrent: action.current ? true : state.containsCurrent
		};
	default:
		return state;
	}
};
  
export default playlistReducer;