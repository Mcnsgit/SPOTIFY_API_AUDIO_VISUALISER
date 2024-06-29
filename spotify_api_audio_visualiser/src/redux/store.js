import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer.js";
import {thunk} from "redux-thunk";

const store = configureStore({
	reducer: rootReducer,  // Combined reducers
	devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(thunk), // Add thunk middleware

});

export default store;
