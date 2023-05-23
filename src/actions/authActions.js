import { api } from '../services/api';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action creators
export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    };
};

export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    };
};

export const signupSuccess = (user) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: user
    };
};

export const signupFailure = (error) => {
    return {
        type: SIGNUP_FAILURE,
        payload: error
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};

// Thunk actions
export const login = (credentials) => {
    return async dispatch => {
        try {
            // Send a POST request to /api/login
            const response = await api.post('/api/login', credentials);
            const user = response.data;

            // Dispatch LOGIN_SUCCESS action
            dispatch(loginSuccess(user));
        } catch (error) {
            // Dispatch LOGIN_FAILURE action
            dispatch(loginFailure(error.response.data.error));
        }
    };
};

export const signup = (credentials) => {
    return async dispatch => {
        try {
            // Send a POST request to /api/signup
            const response = await api.post('/api/signup', credentials);
            const user = response.data;

            // Dispatch SIGNUP_SUCCESS action
            dispatch(signupSuccess(user));
        } catch (error) {
            // Dispatch SIGNUP_FAILURE action
            dispatch(signupFailure(error.response.data.error));
        }
    };
};

export const logoutUser = () => {
    return async dispatch => {
        // Send a GET request to /api/logout
        await api.get('/api/logout');

        // Dispatch LOGOUT action
        dispatch(logout());
    };
};

export const fetchUser = () => {
    return async dispatch => {
        try {
            // Send a GET request to /api/user
            const response = await api.get('/api/user');
            const user = response.data;

            // Dispatch LOGIN_SUCCESS action
            dispatch(loginSuccess(user));
        } catch (error) {
            // Dispatch LOGIN_FAILURE action
            dispatch(loginFailure(error.response.data.error));
        }
    };
};