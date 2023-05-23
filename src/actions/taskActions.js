import { api } from '../services/api';

// Action types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const FETCH_TASK_REQUEST = 'FETCH_TASK_REQUEST';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';
export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';
export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

// Action creators
export const fetchTasksRequest = () => {
    return {
        type: FETCH_TASKS_REQUEST
    };
};

export const fetchTasksSuccess = (tasks) => {
    return {
        type: FETCH_TASKS_SUCCESS,
        payload: tasks
    };
};

export const fetchTasksFailure = (error) => {
    return {
        type: FETCH_TASKS_FAILURE,
        payload: error
    };
};

export const fetchTaskRequest = () => {
    return {
        type: FETCH_TASK_REQUEST
    };
};

export const fetchTaskSuccess = (task) => {
    return {
        type: FETCH_TASK_SUCCESS,
        payload: task
    };
};

export const fetchTaskFailure = (error) => {
    return {
        type: FETCH_TASK_FAILURE,
        payload: error
    };
};

export const addTaskRequest = () => {
    return {
        type: ADD_TASK_REQUEST,
    };
};

export const addTaskSuccess = (task) => {
    return {
        type: ADD_TASK_SUCCESS,
        payload: task
    };
};

export const addTaskFailure = (error) => {
    return {
        type: ADD_TASK_FAILURE,
        payload: error
    };
};

export const deleteTaskRequest = () => {
    return {
        type: DELETE_TASK_REQUEST,
    };
};

export const deleteTaskSuccess = (id) => {
    return {
        type: DELETE_TASK_SUCCESS,
        payload: id
    };
};

export const deleteTaskFailure = (error) => {
    return {
        type: DELETE_TASK_FAILURE,
        payload: error
    };
};

export const updateTaskRequest = () => {
    return {
        type: UPDATE_TASK_REQUEST,
    };
};

export const updateTaskSuccess = (task) => {
    return {
        type: UPDATE_TASK_SUCCESS,
        payload: task
    };
};

export const updateTaskFailure = (error) => {
    return {
        type: UPDATE_TASK_FAILURE,
        payload: error
    };
};

// Thunk actions
export const fetchTasks = () => {
    return async dispatch => {
        try {
            // Send a GET request to /api/tasks
            const response = await api.get('/api/tasks');
            const tasks = response.data;

            // Dispatch FETCH_TASKS_SUCCESS action
            dispatch(fetchTasksSuccess(tasks));
        } catch (error) {
            // Dispatch FETCH_TASKS_FAILURE action
            dispatch(fetchTasksFailure(error.response.data.error));
        }
    };
};

export const fetchTask = (id) => {
    return async dispatch => {
        try {
            // Send a GET request to /api/tasks/:id
            const response = await api.get(`/api/tasks/${id}`);
            const task = response.data;

            // Dispatch FETCH_TASK_SUCCESS action
            dispatch(fetchTaskSuccess(task));
        } catch (error) {
            // Dispatch FETCH_TASK_FAILURE action
            dispatch(fetchTaskFailure(error.response.data.error));
        }
    };
};

export const addTask = (task) => {
    return async dispatch => {
        try {
            // Send a POST request to /api/tasks
            const response = await api.post('/api/tasks', task);
            const newTask = response.data;

            // Dispatch ADD_TASK_SUCCESS action
            dispatch(addTaskSuccess(newTask));
        } catch (error) {
            // Dispatch ADD_TASK_FAILURE action
            dispatch(addTaskFailure(error.response.data.error));
        }
    };
};

export const deleteTask = (id) => {
    return async dispatch => {
        try {
            // Send a DELETE request to /api/tasks/:id
            await api.delete(`/api/tasks/${id}`);

            // Dispatch DELETE_TASK_SUCCESS action
            dispatch(deleteTaskSuccess(id));
        } catch (error) {
            // Dispatch DELETE_TASK_FAILURE action
            dispatch(deleteTaskFailure(error.response.data.error));
        }
    };
};

export const updateTask = (id, task) => {
    return async dispatch => {
        try {
            // Send a PATCH request to /api/tasks/:id
            const response = await api.patch(`/api/tasks/${id}`, task);
            const updatedTask = response.data;

            // Dispatch UPDATE_TASK_SUCCESS action
            dispatch(updateTaskSuccess(updatedTask));
        } catch (error) {
            // Dispatch UPDATE_TASK_FAILURE action
            dispatch(updateTaskFailure(error.response.data.error));
        }
    };
};