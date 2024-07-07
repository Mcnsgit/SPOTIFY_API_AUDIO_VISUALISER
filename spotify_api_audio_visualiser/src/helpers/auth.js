// src/helpers/auth.js

/**
 * Extracts access token from URL fragment.
 * @returns {string} - The access token.
 */
export const extractTokenFromUrl = () => {
   const hash = window.location.hash.substring(1);
   const params = new URLSearchParams(hash);
   return params.get("access_token");
 };
 
 /**
  * Store the access token in local storage or another secure place.
  * @param {string} token - The access token.
  */
 export const storeAccessToken = (token) => {
   localStorage.setItem("spotify_access_token", token);
 };
 
 /**
  * Clear access token from storage.
  */
 export const clearAccessToken = () => {
   localStorage.removeItem("spotify_access_token");
   localStorage.removeItem("refresh_token");
 };