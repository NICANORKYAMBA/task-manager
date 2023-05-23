import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAILURE
} from '../actions/taskActions';

const initialState = {
    tasks: [],
    task: {},
    loading: false,
    error: ''
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                error: ''
            };
        case FETCH_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                tasks: [],
                error: action.payload
            };
        case ADD_TASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.payload],
                error: ''
            };
        case ADD_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_TASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                error: ''
            };
        case DELETE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_TASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
                error: ''
            };
        case UPDATE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default tasksReducer;