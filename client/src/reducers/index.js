import { combineReducers } from 'redux';
import authReducer from './authReducer';

// takes in other reducers and combines
export default combineReducers({
	auth: authReducer
});

// this file is used to take in all of the separate reducers and combine them then export them as an object
