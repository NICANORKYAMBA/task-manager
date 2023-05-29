import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Set the authorization header for authenticted requests
axiosInstance.interceptors.request.use(
    (config) => {
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
    (response) => {
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

        // Return any error which is not due to authentication
        const errorMessage = error.response.data.message || 'Something went wrong';
        return Promise.reject(new Error(errorMessage));
    }
);

// Export the endpoints for use in the actions
// Login the user
export const loginUser = (email, password) => {
    return axiosInstance.post('/auth/login', { email, password });
};

// Register the user
export const signupUser = (username, email, password) => {
    return axiosInstance.post('/auth/signup', { username, email, password });
};

// Logout the user
export const logoutUser = () => {
    return axiosInstance.post('/auth/logout');
};

// Register the user with Google
export const signupWithGoogle = () => {
    return axiosInstance.get('/auth/google/signup');
};

// Google signup callback
export const signupWithGoogleCallback = (code) => {
    return axiosInstance.get(`/auth/google/signup/callback?code=${code}`);
};

// Login the user with Google
export const loginWithGoogle = () => {
    return axiosInstance.get('/auth/google/login');
};

// Google login callback
export const loginWithGoogleCallback = (code) => {
    return axiosInstance.get(`/auth/google/login/callback?code=${code}`);
};

export const api = axiosInstance;