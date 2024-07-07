import axios from "axios";
import { getAccessToken } from "../api/spotify";

const path = "https://api.spotify.com/v1";

const instance = axios.create({
  baseURL: path,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`
  }
});





export default instance;