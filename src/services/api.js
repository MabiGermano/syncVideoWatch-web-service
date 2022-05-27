import axios from 'axios';
import * as dotenv from 'dotenv';

const api = axios.create({
    baseURL: process.env.PLAYLIST_SERVICE_ORIGIN
});

export default api;