import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;

//   switch (action.type) {

//   case "SET_TOKEN":
//     return {
//       ...state,
//       token: action.payload,
//     };

//   default:
//     return state;
//   }

// };

// export default tokenReducer;

// export const tokenReducer = (state = {}, action) => {
//   switch (action.type) {

//   case "SET_TOKEN":
//     return {
//       ...state,
//       token: action.token
//     };

//   default:
//     return state;
//   }

// };

// export default tokenReducer;
