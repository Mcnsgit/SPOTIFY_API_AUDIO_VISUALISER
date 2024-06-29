import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
	name: "music",
	initialState: { playing: null },
	reducers: {
		setPlaying: (state, action) => {
			state.playing = action.payload;
		},
		clearPlaying: (state) => {
			state.playing = null;
		},
	},
});

export const { setPlaying, clearPlaying } = musicSlice.actions;
export default musicSlice.reducer;
