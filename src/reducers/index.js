import getUserReducer from './getUser';
import getPlayerNamesReducer from './getPlayerNames';
import getHolesReducer from './getHoles';
import getGameReducer from './getGame';
import getRoundsReducer from './getRounds';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	getUser: getUserReducer,
	getPlayerNames: getPlayerNamesReducer,
	getHoles: getHolesReducer,
	getGame: getGameReducer,
	getRounds: getRoundsReducer
});

export default allReducers;
