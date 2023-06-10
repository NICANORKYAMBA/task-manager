import {
	login,
	signup,
	logout
} from '../services/api';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT = 'LOGOUT';

export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const authSuccess = (user, userId, userEmail) => ({
  type: AUTH_SUCCESS,
  payload: { user, userId, userEmail }
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
      const { message, token, userId } = response.data;

      if (response.status === 200) {
        const emailParts = email.split('@');
        const userEmail = emailParts[0]; // Extract the part before '@' symbol
        const successMessage = message.split(',')[1].trim();
        const user = { email: userEmail, token };
        dispatch(authSuccess(user, userId, userEmail));
        return { response, userEmail, successMessage };
      } else {
        dispatch(authFailure("Failed to login"));
        return { response: null, userEmail: null, successMessage: null };
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized: Incorrect credentials
        dispatch(authFailure("Invalid email or password"));
      } else {
        // Other errors
        dispatch(authFailure("Failed to login"));
      }
      throw error; // Rethrow the error
    }
  };
};

export const signupUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      const response = await signup(email, password);
      const user = response.data;
      dispatch(authSuccess(user, user.userId, email));
      return response; // Return the response
    } catch (error) {
      handleErrors(error, dispatch, authFailure);
    }
  };
};

export const logOutUser = (config) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());
      await logout(config);
      dispatch(logOut());
    } catch (error) {
      console.log(error);
      const errorMessage = 'Failed to logout';
      dispatch(authFailure(errorMessage));
    }
  };
};