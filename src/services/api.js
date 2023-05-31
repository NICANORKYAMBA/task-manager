import { api } from './apiConfig';

// Authentication endpoints
export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const signup = (username, email, password) => {
  return api.post('/signup', { username, email, password });
};

export const logout = () => {
  return api.post('/logout');
};

export const signupWithGoogle = () => {
  return api.get('/auth/google/signup');
};

export const signupWithGoogleCallback = (code) => {
  return api.get(`/auth/google/signup/callback?code=${code}`);
};

export const loginWithGoogle = () => {
  return api.get('/auth/google/login');
};

export const loginWithGoogleCallback = (code) => {
  return api.get(`/auth/google/login/callback?code=${code}`);
};

export const checkAuthentication = () => {
  return api.get('/auth/check');
};

// Task endpoints
export const fetchTasks = () => {
  return api.get('/tasks');
};

export const fetchTask = (id) => {
  return api.get(`/tasks/${id}`);
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

export const addUser = (user) => {
  return api.post('/users', user);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const updateUser = (id, user) => {
  return api.put(`/users/${id}`, user);
};