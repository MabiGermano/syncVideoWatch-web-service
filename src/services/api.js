import axios from 'axios';
import * as dotenv from 'dotenv';

console.log("axios: ",  process.env.REACT_APP_PLAYLIST_SERVICE_ORIGIN);
const api = axios.create({
    baseURL: process.env.REACT_APP_PLAYLIST_SERVICE_ORIGIN
});

export default api;