import getUserReducer from './getUser';
import getPlayerNamesReducer from './getPlayerNames';
import getHolesReducer from './getHoles';
import getGameReducer from './getGame';
import getRoundsReducer from './getRounds';
import getScoresReducer from './getScores';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	getUser: getUserReducer,
	getPlayerNames: getPlayerNamesReducer,
	getHoles: getHolesReducer,
	getGame: getGameReducer,
	getRounds: getRoundsReducer,
	getScores: getScoresReducer
});

export default allReducers;
