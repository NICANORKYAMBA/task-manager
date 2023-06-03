import { GoogleLogin } from '@leecheuk/react-google-login';
import { GOOGLE_CLIENT_ID } from '../config/config';
import {
  login,
  signup,
  signupWithGoogleCallback,
  loginWithGoogleCallback,
  checkAuthentication,
  logout
} from '../services/api';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT = 'LOGOUT';

export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  payload: user
});

export const authFailure = (error) => {
  let errorMessage = 'Something went wrong';

  if (error.response) {
    if (error.response.status === 409) {
      errorMessage = 'User already exists';
    } else if (error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    }
  }

  return {
    type: AUTH_FAILURE,
    payload: errorMessage
  };
};

export const logOut = () => ({
  type: LOGOUT
});

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

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      const response = await login(email, password);
      const user = response.data;
      dispatch(authSuccess(user));
    } catch (error) {
      handleErrors(error, dispatch, authFailure);
    }
  };
};

export const signupUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      const response = await signup(email, password);
      const user = response.data;
      dispatch(authSuccess(user));
    } catch (error) {
      handleErrors(error, dispatch, authFailure);
    }
  };
};

const authenticateWithGoogle = async (callback, dispatch) => {
  try {
    dispatch(authRequest());

    const { code } = await GoogleLogin.signIn(GOOGLE_CLIENT_ID);

    const response = await callback(code);
    const user = response.data;

    dispatch(authSuccess(user));
  } catch (error) {
    handleErrors(error, dispatch, authFailure);
  }
};

export const signupUserWithGoogle = () => {
  return async (dispatch) => {
    await authenticateWithGoogle(signupWithGoogleCallback, dispatch);
  };
};

export const loginUserWithGoogle = () => {
  return async (dispatch) => {
    await authenticateWithGoogle(loginWithGoogleCallback, dispatch);
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
      // Dispatch an appropriate action or show an error message to the user
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
      // Dispatch an appropriate action or show an error message to the user
    }
  };
};