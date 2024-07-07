import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Added space for consistent formatting
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { SpotifyAuthProvider } from './hooks/SpotifyAuthProvider.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <SpotifyAuthProvider>
      <Provider store={store}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </Provider>
    </SpotifyAuthProvider>
  </ErrorBoundary>
);