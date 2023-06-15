import axios from 'axios';

const API_URL = 'web-01.nicanorsolutions.tech/taskifypro';


const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const api = axiosInstance;
