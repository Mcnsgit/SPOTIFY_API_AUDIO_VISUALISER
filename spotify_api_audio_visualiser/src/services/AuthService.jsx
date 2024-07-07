import axios from 'axios';
import { extractTokenFromUrl, storeAccessToken, clearAccessToken } from '../helpers/auth';


const CLIENT_ID = "1f42356ed83f46cc9ffd35c525fc8541";
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPES = [
  "streaming",
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state"
].join(" ");
class AuthService {
  static login() {
    window.location = [
      "https://accounts.spotify.com/authorize",
      `?client_id=${CLIENT_ID}`,
      `&redirect_uri=${REDIRECT_URI}`,
      `&scope=${SCOPES}`,
      "&response_type=token",
      "&show_dialog=true",
    ].join("");
  }

  static logout() {
    clearAccessToken();
    return { type: "LOGOUT" };
  }

//   static async getToken() {
//     return new Promise((resolve, reject) => {
//     let hashParams = {};
//     let e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
//     while (e = r.exec(q)) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//     }
//     window.location.hash = "";
//     resolve(hashParams.access_token);
//   });
// }

  static getTokenFromUrl() {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
    window.location.hash = '';
    return hash.access_token;
  }

  static handleAuthCallback() {
    const token = extractTokenFromUrl();
    if (token) {
      storeAccessToken(token);
      return { 
        type: "LOGIN_SUCCESS", 
        payload: { accessToken: token } 
      };
    }
    return { 
      type: "LOGIN_FAILURE", 
      payload: { error: "No token found in URL" } 
    };
  }

  static async refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    const url = 'https://accounts.spotify.com/api/token';
    try {
      const response = await axios.post(url, new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      localStorage.setItem('access_token', response.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem('refresh_token', response.data.refresh_token);
      }
      return response.data.access_token;
    } catch (error) {
      console.error('Error refreshing token', error);
      throw error;
    }
  }
}


export { AuthService };