import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {user: null},
  reducers: {
    setUSer: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
  },
  },
});

export const { setUSer, clearUser } = userSlice.actions;
export default userSlice.reducer;

  //   fetchUserError: false,
  //   songAddedToLibrary: false,
  //   songId: null
  // },
  // reducers: {}

  // switch (action.type) {

  // case "FETCH_USER_SUCCESS":
  //   return {
  //     ...state,
  //     user: action.user,
  //     fetchUserError: false
  //   };

  // case "FETCH_USER_ERROR":
  //   return {
  //     ...state,
  //     fetchUserError: true
  //   };

//   case "ADD_SONG_TO_LIBRARY_SUCCESS":
//     return {
//       ...state,
//       songAddedToLibrary: true,
//       songId: action.songId
//     };

//   case "ADD_SONG_TO_LIBRARY_ERROR":
//     return {
//       ...state,
//       songAddedToLibrary: false
//     };

//   default:
//     return state;
//   }

// };

// export default userReducer;
