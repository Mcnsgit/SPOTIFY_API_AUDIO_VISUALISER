import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  discover_weekly: null,
  followed_artists: null,
  saved_albums: null,
  top_artists: null,
  top_tracks: null,
  user_playlists: null,
  userProfile: {
    display_name: null,
    image:'',
    spotifyUrl:''
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setPlaylists: (state, action) => {
      state.user_playlists = action.payload;
    },
    setTopArtists: (state, action) => {
      state.top_artists = action.payload;
    },
    setTopTracks: (state, action) => {
      state.top_tracks = action.payload;
    },
    setDiscoverWeekly: (state, action) => {
      state.discover_weekly = action.payload;
    },
    setSavedAlbums: (state, action) => {
      state.saved_albums = action.payload;
    },
    setFollowedArtists: (state, action) => {
      state.followed_artists = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  setUser,
  clearUser,
  setPlaylists,
  setTopArtists,
  setTopTracks,
  setDiscoverWeekly,
  setSavedAlbums,
  setFollowedArtists,
  resetState,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
export { initialState };
