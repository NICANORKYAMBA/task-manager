import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';


// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;