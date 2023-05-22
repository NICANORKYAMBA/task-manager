import { combineReducers } from "redux";
import tasksReducer from './reducers/tasksReducer';

const rootReducer = combineReducers({
    tasks: tasksReducer
});

export default rootReducer;