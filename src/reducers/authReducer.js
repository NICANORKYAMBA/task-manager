import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT
} from '../actions/authActions';

const initialState = {
    user: {},
    loading: false,
    error: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: ''
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                user: {},
                error: action.payload
            };
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: ''
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                user: {},
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: {}
            };
        default:
            return state;
    }
}

export default authReducer;