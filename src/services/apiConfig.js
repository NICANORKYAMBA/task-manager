import axios from 'axios';

const API_URL = 'https://task-manager-backend-rho.vercel.app';


const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const api = axiosInstance;
