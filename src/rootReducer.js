import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import tasksReducer from "./reducers/taskReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: tasksReducer,
    user: userReducer,
});

export default rootReducer;