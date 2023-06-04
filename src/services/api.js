import { api } from './apiConfig';

// Authentication endpoints
export const login = (email, password) => {
  return api.post('api/auth/login', { email, password });
};

export const signup = (email, password) => {
  return api.post('api/auth/signup', { email, password });
};

export const logout = () => {
  return api.post('api/auth/logout');
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

export const addTask = (task) => {
  return api.post('/tasks', task);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

export const updateTask = (id, task) => {
  return api.put(`/tasks/${id}`, task);
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