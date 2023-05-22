const initialState = {
    tasks: [],
    task: {}
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS':
            return { ...state, tasks: action.payload };
        case 'FETCH_TASK':
            return { ...state, task: action.payload };
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
        case 'EDIT_TASK':
            return { ...state, tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task) };
        default:
            return state;
    }
};

export default tasksReducer;