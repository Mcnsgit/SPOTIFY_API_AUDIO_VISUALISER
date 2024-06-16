import axios from "../../utils/axios";

const fetchPlaylistMenuPending = () => ({ type: "FETCH_PLAYLIST_MENU_PENDING" });

const fetchPlaylistMenuSuccess = playlists => ({ type: "FETCH_PLAYLIST_MENU_SUCCESS", playlists });

const fetchPlaylistMenuError = () => ({ type: "FETCH_PLAYLIST_MENU_ERROR" });

export const movePlaylist = (snapshot_id, from, to) => ({
    type: "SORT_SONG",
    snapshot_id,
    from,
    to
});

export const movePlaylistSong = (playlist, range_start, insert_before) => async dispatch => {
    try {
        const data = {
            range_start,
            insert_before: insert_before === 0 ? insert_before : insert_before + 1,
            snapshot_id: playlist.snapshot_id
        };
        const response = await axios.put(`/playlists/${playlist.id}/tracks`, data);
        dispatch(movePlaylist(response.data.snapshot_id, range_start, insert_before));
        return response.data;
    } catch (error) {
        console.error('Error moving playlist song:', error);
        return error;
    }
};

export const fetchPlaylistsMenu = () => async dispatch => {
    dispatch(fetchPlaylistMenuPending());
    try {
        const response = await axios.get("/me/playlists");
        dispatch(fetchPlaylistMenuSuccess(response.data));
        return response.data;
    } catch (error) {
        dispatch(fetchPlaylistMenuError());
        console.error('Error fetching playlists menu:', error);
        return error;
    }
};

// Other action creators...
