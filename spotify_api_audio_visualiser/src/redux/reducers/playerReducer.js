// src/redux/reducers/playerReducer.js
const initialState = {
  currentTrack: {
    name: '',
    album: { images: [{ url: '' }] },
    artists: [{ name: '' }],
  },
  isPlaying: false,
  trackPosition: 0,
  deviceId: null,
  volume: 50,
};
const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_TRACK":
      return { ...state, currentTrack: action.payload };
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_TRACK_POSITION":
      return { ...state, trackPosition: action.payload };
    case "SET_DEVICE_ID":
      return { ...state, deviceId: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    default:
      return state;
  }
};

export default playerReducer;
