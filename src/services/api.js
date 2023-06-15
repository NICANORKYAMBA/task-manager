import { api } from './apiConfig';

// Authentication endpoints
export const login = (email, password) => {
  return api.post('api/auth/login', { email, password });
};

export const signup = (email, password) => {
  return api.post('api/auth/signup', { email, password });
};

export const logout = (config) => {
  return api.get('api/auth/logout', config);
};

export const signupWithGoogle = () => {
  return api.get('api/auth/google/signup');
};

export const signupWithGoogleCallback = (code) => {
  return api.get(`api/auth/google/signup/callback?code=${code}`);
};

export const loginWithGoogle = () => {
  return api.get('api/auth/google/login');
};

export const loginWithGoogleCallback = (code) => {
  return api.get(`api/auth/google/login/callback?code=${code}`);
};

export const checkAuthentication = () => {
  return api.get('api/auth/check');
};

// Task endpoints
export const fetchTasks = (userId) => {
  return api.get(`/api/tasks/${userId}`);
};

export const fetchTask = (userId, taskId, config) => {
  return api.get(`/api/tasks/${userId}/${taskId}`, config);
};

export const addTask = (task, config) => {
  return api.post('/api/tasks', task, config);
};

export const deleteTask = (userId, taskId, config) => {
  return api.delete(`/api/tasks/delete/${userId}/${taskId}`, config);
};

export const updateTask = (userId, taskId, task, config) => {
  return api.put(`/api/tasks/update/${userId}/${taskId}`, task, config);
};

export const extendTasksDueDate = (id, dueDate) => {
  return api.put(`/api/tasks/${id}/extend`, { dueDate });
};

export const sortTasksByField = (field) => {
  return api.get(`/api/tasks/sort?field=${field}`);
};

// User endpoints
export const fetchUsers = (config) => {
  return api.get('/api/users', config);
};

export const fetchUser = (id, config) => {
  return api.get(`/api/users/${id}`, config);
};

export const deleteUser = (id, config) => {
  return api.delete(`/api/users/delete/${id}`, config);
};

export const updatedUser = (id, user, config) => {
  return api.put(`/api/users/update/${id}`, user, config);
};
