// src/redux/reducers/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	access_token: null,
	refresh_token: null,
	expires_at: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.access_token = action.payload.access_token;
			state.refresh_token = action.payload.refresh_token;
			state.expires_at = action.payload.expires_at;
		},
		clearToken: (state) => {
			state.access_token = null;
			state.refresh_token = null;
			state.expires_at = null;
		},
	},
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
