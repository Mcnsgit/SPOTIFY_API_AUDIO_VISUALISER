
import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import userReducer from './userReducer';
import playlistReducer from './playlistReducer';
import browseReducer from './browseReducer';
import libraryReducer from './libraryReducer.js';
import uiReducer from './uiReducer';
import artistReducer from './artistsReducer';
import albumReducer from './albumsReducer';
import playerReducer from './playerReducer';
import searchReducer from './searchReducer';

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
  searchReducer
});
