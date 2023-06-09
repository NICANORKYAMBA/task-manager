import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE
} from '../actions/userActions';

const initialState = {
  loading: false,
  user: null,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case USER_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;