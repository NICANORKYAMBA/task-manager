import { GoogleLogin } from '@leecheuk/react-google-login';
import { GOOGLE_CLIENT_ID } from '../config/config';
import {
  login,
  signup,
//  signupWithGoogle,
  signupWithGoogleCallback,
  //loginWithGoogle,
  loginWithGoogleCallback,
  checkAuthentication,
  logout
} from '../services/api';

// Action types
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action creators
export const authRequest = () => {
  return {
    type: AUTH_REQUEST
  };
};

export const authSuccess = (user) => {
  return {
    type: AUTH_SUCCESS,
    payload: user
  };
};

export const authFailure = (error) => {
  return {
    type: AUTH_FAILURE,
    payload: error
  };
};

export const logOut = () => {
  return {
    type: LOGOUT
  };
};

// Common error handling function
const handleErrors = (error, dispatch, failureAction) => {
  let errorMessage = 'Something went wrong';

  if (error.response) {
    if (error.response.status === 409) {
      errorMessage = 'User already exists';
    } else if (error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    }
  }

  dispatch(failureAction(errorMessage));
};

// Thunk actions
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      const response = await login(credentials.email, credentials.password);
      const user = response.data;
      dispatch(authSuccess(user));
    } catch (error) {
      handleErrors(error, dispatch, authFailure);
    }
  };
};

export const signupUser = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      const response = await signup(
        credentials.username,
        credentials.email,
        credentials.password
      );
      const user = response.data;
      dispatch(authSuccess(user));
    } catch (error) {
      handleErrors(error, dispatch, authFailure);
    }
  };
};

export const signupUserWithGoogle = () => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());

      // Call Google's API signin method
      const { code } = await GoogleLogin.signIn(GOOGLE_CLIENT_ID);

      // Send a GET request to /auth/google/signup/callback with the authorization code
      const response = await signupWithGoogleCallback(code);

      // Extract the user from the response
      const user = response.data;

      // Dispatch AUTH_SUCCESS action with the user
      dispatch(authSuccess(user));
    } catch (error) {
      handleErrors(error, dispatch, authFailure);
    }
  };
};

export const signupUserWithGoogleCallback = (code) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      const response = await signupWithGoogleCallback(code);
      const user = response.data;
      dispatch(authSuccess(user));
    } catch (error) {
      handleErrors(error, dispatch, authFailure);
    }
  };
};

export const loginUserWithGoogle = () => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());

      // Call Google's API signin method
      const { code } = await GoogleLogin.signIn(GOOGLE_CLIENT_ID);

      // Send a GET request to /auth/google/login/callback with the authorization code
      const response = await loginWithGoogleCallback(code);

      // Extract the user from the response
      const user = response.data;

      // Dispatch AUTH_SUCCESS action with the user
      dispatch(authSuccess(user));
    } catch (error) {
      handleErrors(error, dispatch, authFailure);
    }
  };
};

export const loginUserWithGoogleCallback = (code) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      const response = await loginWithGoogleCallback(code);
      const user = response.data;
      dispatch(authSuccess(user));
    } catch (error) {
      handleErrors(error, dispatch, authFailure);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const response = await checkAuthentication();
      const user = response.data;
      dispatch(authSuccess(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    try {
      await logout();
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  };
};