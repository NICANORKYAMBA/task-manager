import { api } from '../services/api';

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action creators
export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

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

export const signupRequest = () => {
    return {
        type: SIGNUP_REQUEST
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
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await api.loginUser(credentials.email, credentials.password);
      const user = response.data;
      dispatch(loginSuccess(user));
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error scenarios
        const errorData = error.response.data;
        const errorMessage = errorData.error || 'An error occurred';
        dispatch(loginFailure(errorMessage));
      } else {
        // Handle generic error
        dispatch(loginFailure('An error occurred'));
      }
    }
  };
};

export const signup = (credentials) => {
  return async (dispatch) => {
    try {
      // Dispatch SIGNUP_REQUEST action
      dispatch(signupRequest());

      // Send a POST request to /api/signup
      const response = await api.signupUser(
        credentials.username,
        credentials.email,
        credentials.password
      );

      // Extract the user from the response
      const user = response.data;

      // Dispatch SIGNUP_SUCCESS action with the user
      dispatch(signupSuccess(user));
    } catch (error) {
      // Default error message
      let errorMessage = 'Something went wrong';

      // Check if error.response exists and has data and error properties
      if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        errorMessage = error.response.data.error;
      }

      // Dispatch SIGNUP_FAILURE action with the error message
      dispatch(signupFailure(errorMessage));
    }
  };
};

export const signupWithGoogle = () => {
  return async (dispatch) => {
    try {
      // Dispatch SIGNUP_REQUEST action
      dispatch(signupRequest());

      // Send a POST request to /api/signup/google
      const response = await api.signupWithGoogle();

      // Extract the user from the response
      const user = response.data;

      // Dispatch SIGNUP_SUCCESS action with the user
      dispatch(signupSuccess(user));
    } catch (error) {
      // Default error message
      let errorMessage = 'Something went wrong';

      if (error.response && error.response.status === 409) {
        // If the error status is 409, it means the user already exists
        errorMessage = 'User already exists';
        window.location.href = loginWithGoogle;

      // Check if error.response exists and has data and error properties
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        errorMessage = error.response.data.error;
        // Dispatch SIGNUP_FAILURE action with the error message
        dispatch(signupFailure(errorMessage));
      } else {
        dispatch(signupFailure('An error occurred'));
      }
    }
  };
};

export const signupWithGoogleCallback = (code) => {
  return async (dispatch) => {
    try {
      // Dispatch SIGNUP_REQUEST action
      dispatch(signupRequest());
      const response = await api.signupWithGoogleCallback(code);
      const user = response.data;
      dispatch(signupSuccess(user));
    } catch (error) {
      // Default error message
      let errorMessage = 'Something went wrong';
      if (error.response && error.response.data && error.response.data.error) {
        dispatch(signupFailure(error.response.data.error));
      } else {
        dispatch(signupFailure(errorMessage));
      }
    }
  };
};


export const loginWithGoogle = () => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await api.loginWithGoogle();
      const user = response.data;
      dispatch(loginSuccess(user));
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        dispatch(loginFailure(error.response.data.error));
      } else {
        dispatch(loginFailure('An error occurred'));
      }
    }
  };
}

export const loginWithGoogleCallback = (code) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await api.loginWithGoogleCallback(code);
      const user = response.data;
      dispatch(loginSuccess(user));
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        dispatch(loginFailure(error.response.data.error));
      } else {
        dispatch(loginFailure('An error occurred'));
      }
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      await api.logoutUser();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
};