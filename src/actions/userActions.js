import { fetchUser, deleteUser, updatedUser } from '../services/api';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

export const userRequest = () => ({
  type: USER_REQUEST
});

export const userSuccess = (user) => ({
  type: USER_SUCCESS,
  payload: user
});

export const userFailure = (error) => ({
  type: USER_FAILURE,
  payload: error
});

export const fetchTheUser = (id, token) => {
  return async (dispatch) => {
    try {
      dispatch(userRequest());
      const { data } = await fetchUser(id, token);
      dispatch(userSuccess(data));
    } catch (error) {
      handleErrors(error, dispatch, userFailure);
    }
  };
};

export const removeUser = (id, token) => {
  return async (dispatch) => {
    try {
      dispatch(userRequest());
      await deleteUser(id, token);
      dispatch(userSuccess());
    } catch (error) {
      handleErrors(error, dispatch, userFailure);
    }
  };
};

export const updateUser = (id, user, token) => {
  return async (dispatch) => {
    try {
      dispatch(userRequest());
      await updatedUser(id, user, token);
      dispatch(userSuccess(user));
    } catch (error) {
      handleErrors(error, dispatch, userFailure);
    }
  };
};

const handleErrors = (error, dispatch, failureAction) => {
  let errorMessage = 'Something went wrong';

  if (error.response) {
    const { status, data } = error.response;
    if (status === 409) {
      errorMessage = 'User already exists';
    } else if (data && data.error) {
      errorMessage = data.error;
    }
  }

  dispatch(failureAction(errorMessage));
};