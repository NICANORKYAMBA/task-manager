import {
  fetchTask,
  fetchTasks,
  addTask,
  deleteTask,
  updateTask
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

// Action creators
const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST
});

const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks
});

const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error
});

const fetchTaskRequest = () => ({
  type: FETCH_TASK_REQUEST
});

const fetchTaskSuccess = (task) => ({
  type: FETCH_TASK_SUCCESS,
  payload: task
});

const fetchTaskFailure = (error) => ({
  type: FETCH_TASK_FAILURE,
  payload: error
});

const addTaskRequest = () => ({
  type: ADD_TASK_REQUEST
});

const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  payload: task
});

const addTaskFailure = (error) => ({
  type: ADD_TASK_FAILURE,
  payload: error
});

const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST
});

const deleteTaskSuccess = (id) => ({
  type: DELETE_TASK_SUCCESS,
  payload: id
});

const deleteTaskFailure = (error) => ({
  type: DELETE_TASK_FAILURE,
  payload: error
});

const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST
});

const updateTaskSuccess = (task) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: task
});

const updateTaskFailure = (error) => ({
  type: UPDATE_TASK_FAILURE,
  payload: error
});

// Thunk actions
export const getAllTasks = (userId) => async (dispatch) => {
  try {
    dispatch(fetchTasksRequest());
    const response = await fetchTasks(userId);
    const tasks = response.data;
    dispatch(fetchTasksSuccess(tasks));
  } catch (error) {
    dispatch(fetchTasksFailure(error.message));
  }
};

export const getTask = (id) => async (dispatch) => {
  try {
    dispatch(fetchTaskRequest());
    const response = await fetchTask(id);
    const task = response.data;
    dispatch(fetchTaskSuccess(task));
  } catch (error) {
    dispatch(fetchTaskFailure(error.message));
  }
};

export const addNewTask = (task) => async (dispatch) => {
  try {
    dispatch(addTaskRequest());
    const response = await addTask(task);
    const newTask = response.data;
    dispatch(addTaskSuccess(newTask));
  } catch (error) {
    dispatch(addTaskFailure(error.message));
  }
};

export const taskDeletion = (id) => async (dispatch) => {
  try {
    dispatch(deleteTaskRequest());
    await deleteTask(id);
    dispatch(deleteTaskSuccess(id));
  } catch (error) {
    dispatch(deleteTaskFailure(error.message));
  }
};

export const taskUpdate = (id, task) => async (dispatch) => {
  try {
    dispatch(updateTaskRequest());
    const response = await updateTask(id, task);
    const updatedTask = response.data;
    dispatch(updateTaskSuccess(updatedTask));
  } catch (error) {
    dispatch(updateTaskFailure(error.message));
  }
};