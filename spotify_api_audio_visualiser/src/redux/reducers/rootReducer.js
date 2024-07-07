import { combineReducers } from "redux";

import sessionReducer from "./sessionReducer.js";
import userReducer from "./userReducer.js";
import playlistReducer from "./playlistReducer.js";
import browseReducer from "./browseReducer.js";
import libraryReducer from "./libraryReducer.js";
import uiReducer from "./uiReducer.js";
import artistReducer from "./artistReducer.js";
import albumReducer from "./albumsReducer.js";
import playerReducer from "./playerReducer.js";
import searchReducer from "./searchReducer.js";
import tokenReducer from "./tokenReducer.js";
import visualizerReducer from "./visualizerReducer.js";
import audioApiReducer from "./audioApiReducer.js";


export default combineReducers({
	sessionReducer,
	userReducer,
	playlistReducer,
	browseReducer,
	libraryReducer,
	uiReducer,
	artistReducer,
	albumReducer,
	playerReducer,
	visualizerReducer,
	tokenReducer,
	audioApiReducer,
	searchReducer,
	});
