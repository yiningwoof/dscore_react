import loggedReducer from "./isLogged";
import getUserReducer from "./getUser";
import getPlayerNamesReducer from "./getPlayerNames";
import getHolesReducer from "./getHoles";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  getUser: getUserReducer,
  getPlayerNames: getPlayerNamesReducer,
  getHoles: getHolesReducer
});

export default allReducers;
