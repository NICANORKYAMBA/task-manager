export const addTask = (task) => {
    return async dispatch => {
        const response = await tasks.post('/api/tasks', task);
        dispatch({ type: 'ADD_TASK', payload: response.data });
    };
};

export const deleteTask = (id) => {
    return async dispatch => {
        await tasks.delete(`/api/tasks/${id}`);
        dispatch({ type: 'DELETE_TASK', payload: id });
    };
};

export const editTask = (id, task) => {
    return async dispatch => {
        const response = await tasks.patch(`/api/tasks/${id}`, task);
        dispatch({ type: 'EDIT_TASK', payload: response.data });
    };
};


export const fetchTasks = () => {
    return async dispatch => {
        const response = await tasks.get('/api/tasks');
        dispatch({ type: 'FETCH_TASKS', payload: response.data });
    };
};

export const fetchTask = (id) => {
    return async dispatch => {
        const response = await tasks.get(`/api/tasks/${id}`);
        dispatch({ type: 'FETCH_TASK', payload: response.data });
    };
};

export const fetchUser = (id) => {
    return async dispatch => {
        const response = await tasks.get(`/api/users/${id}`);
        dispatch({ type: 'FETCH_USER', payload: response.data });
    };
};

export const fetchUsers = () => {
    return async dispatch => {
        const response = await tasks.get('/api/users');
        dispatch({ type: 'FETCH_USERS', payload: response.data });
    };
};

export const fetchUserTasks = (id) => {
    return async dispatch => {
        const response = await tasks.get(`/api/users/${id}/tasks`);
        dispatch({ type: 'FETCH_USER_TASKS', payload: response.data });
    };
};

export const fetchUserTask = (userId, taskId) => {
    return async dispatch => {
        const response = await tasks.get(`/api/users/${userId}/tasks/${taskId}`);
        dispatch({ type: 'FETCH_USER_TASK', payload: response.data });
    };
};