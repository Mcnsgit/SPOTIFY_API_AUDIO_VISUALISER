
// JavaScript code for handling Axios requests related to Spotify API, including token authorization and refresh

import axios from "axios";
import { getAccessToken } from "../api/spotify";

const path = "https://api.spotify.com/v1";

// Create an Axios instance with base URL and authorization header
const instance = axios.create({
  baseURL: path,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`
  }
});

// Export the Axios instance for API calls
export default instance;

// Define AuthService for handling token refresh functionality
export const AuthService = {
  refreshToken: async () => {
    try {
      const response = await axios.get('/refresh_token');  // Replace with your refresh token endpoint
      return response.data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
};