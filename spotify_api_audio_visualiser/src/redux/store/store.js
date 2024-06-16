import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../redux/reducers/index.js';

const store = configureStore({
  reducer: rootReducer,  // Combined reducers
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export default store;
