import loggedReducer from './isLogged';
import getUserReducer from './getUser';
import getPlayerNamesReducer from './getPlayerNames';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	isLogged: loggedReducer,
	getUser: getUserReducer,
	getPlayerNames: getPlayerNamesReducer
});

export default allReducers;
