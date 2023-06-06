import { api } from './apiConfig';

// Authentication endpoints
export const login = (email, password) => {
  return api.post('api/auth/login', { email, password });
};

export const signup = (email, password) => {
  return api.post('api/auth/signup', { email, password });
};

export const logout = () => {
  return api.get('api/auth/logout');
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

export const fetchTask = (id) => {
  return api.get(`api/tasks/${id}`);
};

export const addTask = (task, config) => {
  return api.post('/api/tasks', task, config);
};

export const deleteTask = (id) => {
  return api.delete(`/api/tasks/${id}`);
};

export const updateTask = (id, task) => {
  return api.put(`/api/tasks/${id}`, task);
};

export const extendTasksDueDate = (id, dueDate) => {
  return api.put(`/api/tasks/${id}/extend`, { dueDate });
};

export const sortTasksByField = (field) => {
  return api.get(`/api/tasks/sort?field=${field}`);
};

// User endpoints
export const fetchUsers = () => {
  return api.get('/users');
};

export const fetchUser = (id) => {
  return api.get(`/users/${id}`);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const updateUser = (id, user) => {
  return api.put(`/users/${id}`, user);
};