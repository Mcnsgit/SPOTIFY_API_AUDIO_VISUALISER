
export const playlistReducer = (state = {}, action) => {
	switch (action.type) {
	case "FETCH_PLAYLIST_MENU_PENDING":
		return {
			...state,
			fetchPlaylistsPending: true
		};

	case "FETCH_PLAYLIST_MENU_SUCCESS":
		return {
			...state,
			playlists: action.playlists,
			fetchPlaylistsError: false,
			fetchPlaylistsPending: false
		};
	case "FETCH_PLAYLIST_MENU_ERROR":
		return {
			...state,
			fetchPlaylistsError: true,
			fetchPlaylistsPending: false
		};
	case "FETCH_PLAYLIST_PENDING":
		return {
			...state,
			fetchPlaylistPending: true
		};
	case "UPDATE_PLAYLIST":
		return {
			...state,
			playlist: { ...state.playlist, ...action.playlist }
		};

	case "FETCH_PLAYLIST_SUCCESS":
		return {
			...state,
			playlist: action.playlist,
			fetchPlaylistError: false,
			fetchPlaylistPending: false
		};

	case "FETCH_PLAYLIST_ERROR":
		return {
			...state,
			fetchPlaylistError: true,
			fetchPlaylistPending: false
		};
	case "FETCH_MORE_SUCCESS": {
		let items = [...state.playlist.tracks.items, ...action.tracks];
		return {
			...state,
			playlist: {
				...state.playlist,
				tracks: { ...state.playlist.tracks, next: action.next, items: items }
			}
		};
	}

	case "FOLLOW_PLAYLIST": {
		let array = state.playlists.items;
		array.unshift({ id: state.playlist.id, name: state.playlist.name });
		return {
			...state,
			playlist: { ...state.playlist, follows: true },
			playlists: {
				...state.playlists,
				total: state.playlists.total + 1,
				items: array
			}
		};
	}

	case "SORT_SONG":{
		let tracks = [...state.playlist.tracks.items];
		var track = tracks[action.from];
		tracks.splice(action.from, 1);
		tracks.splice(action.to, 0, track);
		return {
			...state,
			playlist: {
				...state.playlist,
				snapshot_id: action.snapshot_id,
				tracks: { ...state.playlist.tracks, items: tracks }
			}
		};
		}
		case "UNFOLLOW_PLAYLIST": {
			let array = state.playlists.items.filter(i => i.id !== state.playlist.id);
			return {
				...state,
				playlist: { ...state.playlist, follows: false },
				playlists: {
				...state.playlists,
				total: state.playlists.total - 1,
				items: array
			}
		};
	}
	default:
		return state;
}
};

export default playlistReducer;
