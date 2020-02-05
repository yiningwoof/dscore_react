import loggedReducer from './isLogged';
import getUserReducer from './getUser';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	isLogged: loggedReducer,
	getUser: getUserReducer
});

export default allReducers;
