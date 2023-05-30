import { api } from './apiConfig';

// Export the endpoints for use in the actions
// Login the user
export const loginUser = (email, password) => {
    return api.post('/auth/login', { email, password });
};

// Register the user
export const signupUser = (username, email, password) => {
    return api.post('/auth/signup', { username, email, password });
};

// Logout the user
export const logoutUser = () => {
    return api.post('/auth/logout');
};

// Register the user with Google
export const signupUserWithGoogle = () => {
    return api.get('/auth/google/signup');
};

// Google signup callback
export const signupUserWithGoogleCallback = (code) => {
    return api.get(`/auth/google/signup/callback?code=${code}`);
};

// Login the user with Google
export const loginUserWithGoogle = () => {
    return api.get('/auth/google/login');
};

// Google login callback
export const loginUserWithGoogleCallback = (code) => {
    return api.get(`/auth/google/login/callback?code=${code}`);
};

// Check user authentication
export const checkAuthentication = () => {
    return api.get('/auth/check');
};

// Get all tasks
export const fetchTasks = () => {
    return api.get('/tasks');
};

// Get a single task
export const fetchTask = (id) => {
    return api.get(`/tasks/${id}`);
};

// Add a task
export const addTask = (task) => {
    return api.post('/tasks', task);
};

// Delete a task
export const deleteTask = (id) => {
    return api.delete(`/tasks/${id}`);
};

// Update a task
export const updateTask = (id, task) => {
    return api.put(`/tasks/${id}`, task);
};

// Get all users
export const fetchUsers = () => {
    return api.get('/users');
};

// Get a single user
export const fetchUser = (id) => {
    return api.get(`/users/${id}`);
};

// Add a user
export const addUser = (user) => {
    return api.post('/users', user);
};

// Delete a user
export const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
};

// Update a user
export const updateUser = (id, user) => {
    return api.put(`/users/${id}`, user);
};