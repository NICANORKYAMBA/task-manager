import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Set the authorization header for authenticted requests
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Handle 401 Unauthorized responses
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            // Logout the user
            localStorage.removeItem('token');
            window.location.href = '/login';

            return Promise.reject(error);
        }
    }
);

export const api = axiosInstance;