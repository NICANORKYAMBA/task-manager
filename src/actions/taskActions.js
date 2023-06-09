import {
	fetchTasks,
	fetchTask,
	addTask,
	deleteTask,
	updateTask,
	extendTasksDueDate,
	sortTasksByField
} from "../services/api";

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
export const EXTEND_TASK_DUE_DATE_REQUEST = 'EXTEND_TASK_DUE_DATE_REQUEST';
export const EXTEND_TASK_DUE_DATE_SUCCESS = 'EXTEND_TASK_DUE_DATE_SUCCESS';
export const EXTEND_TASK_DUE_DATE_FAILURE = 'EXTEND_TASK_DUE_DATE_FAILURE';
export const SORT_TASKS_REQUEST = 'SORT_TASKS_REQUEST';
export const SORT_TASKS_SUCCESS = 'SORT_TASKS_SUCCESS';
export const SORT_TASKS_FAILURE = 'SORT_TASKS_FAILURE';

// Action creators
const requestAction = (type) => ({
  type
});

const successAction = (type, payload) => ({
  type,
  payload
});

const failureAction = (type, error) => ({
  type,
  payload: error
});

// Thunk actions
export const getAllTasks = (userId) => async (dispatch) => {
  try {
    dispatch(requestAction(FETCH_TASKS_REQUEST));
    const response = await fetchTasks(userId);
    const tasks = response.data;
    dispatch(successAction(FETCH_TASKS_SUCCESS, tasks));
  } catch (error) {
    dispatch(failureAction(FETCH_TASKS_FAILURE, error.message));
  }
};

export const getTaskById = (userId, taskId, config) => async (dispatch) => {
  try {
    dispatch(requestAction(FETCH_TASK_REQUEST));
    const response = await fetchTask(userId, taskId, config);
    const task = response.data;
    dispatch(successAction(FETCH_TASK_SUCCESS, task));
    return response;
  } catch (error) {
    dispatch(failureAction(FETCH_TASK_FAILURE, error.message));
  }
};

export const createTask = (task, config) => async (dispatch) => {
  try {
    dispatch(requestAction(ADD_TASK_REQUEST));
    const response = await addTask(task, config);
    const newTask = response.data;
    dispatch(successAction(ADD_TASK_SUCCESS, newTask));
  } catch (error) {
    dispatch(failureAction(ADD_TASK_FAILURE, error.message));
  }
};

export const deleteTaskById = (userId, taskId, config) => async (dispatch) => {
  try {
    dispatch(requestAction(DELETE_TASK_REQUEST));
    const response = await deleteTask(userId, taskId, config);
    const statusCode = response.status;
    console.log(statusCode);
    
    if (statusCode === 200) {
      dispatch(successAction(DELETE_TASK_SUCCESS, taskId));
      return { success: true, message: "Task deleted successfully" };
    } else {
      const errorMessage = getErrorMessageFromStatusCode(statusCode);
      dispatch(failureAction(DELETE_TASK_FAILURE, errorMessage));
    }
  } catch (error) {
    dispatch(failureAction(DELETE_TASK_FAILURE, error.message));
  }
};

const getErrorMessageFromStatusCode = (statusCode) => {
  // Map the status code to an appropriate error message
  if (statusCode === 401) {
    return 'Not authorized to delete the task';
  } else if (statusCode === 404) {
    return 'Task not found';
  } else {
    return 'An error occurred while deleting the task';
  }
};

export const updateTaskById = (userId, taskId, task, config) => async (dispatch) => {
  try {
    dispatch(requestAction(UPDATE_TASK_REQUEST));
    const response = await updateTask(userId, taskId, task, config);
    const updatedTask = response.data;
    dispatch(successAction(UPDATE_TASK_SUCCESS, updatedTask));
  } catch (error) {
    dispatch(failureAction(UPDATE_TASK_FAILURE, error.message));
  }
};

export const extendTaskDueDateById = (userId, taskId, dueDate) => async (dispatch) => {
  try {
    dispatch(requestAction(EXTEND_TASK_DUE_DATE_REQUEST));
    const response = await extendTasksDueDate(userId, taskId, dueDate);
    const extendedTask = response.data;
    dispatch(successAction(EXTEND_TASK_DUE_DATE_SUCCESS, extendedTask));
  } catch (error) {
    dispatch(failureAction(EXTEND_TASK_DUE_DATE_FAILURE, error.message));
  }
};

export const sortTaskByField = (field) => async (dispatch) => {
  try {
    dispatch(requestAction(SORT_TASKS_REQUEST));
    const response = await sortTasksByField(field);
    const sortedTasks = response.data;
    dispatch(successAction(SORT_TASKS_SUCCESS, sortedTasks));
  } catch (error) {
    dispatch(failureAction(SORT_TASKS_FAILURE, error.message));
  }
};