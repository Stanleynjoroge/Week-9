import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from './projectReducer';
// Import other reducers as needed

const rootReducer = combineReducers(
  {
  project: projectReducer,
  // Add other reducers here
});

export default rootReducer;