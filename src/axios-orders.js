import axios from'axios';
import * as config from './config';

const instance = axios.create({
    baseURL: config.FIREBASE_URL,
});

export default instance;