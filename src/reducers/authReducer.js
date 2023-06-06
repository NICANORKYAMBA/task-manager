import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT
} from '../actions/authActions';

const initialState = {
  user: null,
  userId: null,
  userEmail: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default authReducer;