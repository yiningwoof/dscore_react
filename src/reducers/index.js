import getUserReducer from "./getUser";
import getPlayerNamesReducer from "./getPlayerNames";
import getHolesReducer from "./getHoles";
import getGameReducer from "./getGame";
import getRoundsReducer from "./getRounds";
import getScoresReducer from "./getScores";
import getAllScoresReducer from "./getAllScores";
import getGameDataReducer from "./getGameData";
import getScoresFromResReducer from "./getScoresFromRes";
import getAllRoundsReducer from "./getAllRounds";
import updateHoleScoresReducer from "./updateHoleScores";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  getUser: getUserReducer,
  getPlayerNames: getPlayerNamesReducer,
  getHoles: getHolesReducer,
  getGame: getGameReducer,
  getRounds: getRoundsReducer,
  getAllRounds: getAllRoundsReducer,
  getScores: getScoresReducer,
  getAllScores: getAllScoresReducer,
  getGameData: getGameDataReducer,
  getScoresFromRes: getScoresFromResReducer,
  updateHoleScores: updateHoleScoresReducer
});

export default allReducers;
