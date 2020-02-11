import React, { useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  signOut,
  getUser,
  getHoles,
  getGame,
  getAllRounds,
  getAllScores
} from "./actions";
// import { connect } from "react-redux";
import axios from "axios";

import "./App.css";

import { Nav } from "./components/Nav/Nav";
import { Home } from "./components/Home/Home";
// import { CurrentGame } from "./components/CurrentGame/CurrentGame";
// import Leaderboard from "./components/Leaderboard/Leaderboard";
import { Registration } from "./components/Registration/Registration";
import { SignInButton } from "./components/SignInButton/SignInButton";
import { NewGame } from "./components/NewGame/NewGame";
import { CurrentGame } from "./components/CurrentGame/CurrentGame";
import { Leaderboard } from "./components/Leaderboard/Leaderboard";

// STORE -> GLOBALIZED STATE
// ACTION
// REDUCER
// DISPATCH

function App() {
  const loggedUser = useSelector(state => state.getUser);
  const game = useSelector(state => state.getGame);
  //   const playerNames = useSelector(state => state.getPlayerNames);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    dispatch(getUser());
    dispatch(getHoles());
    dispatch(getAllRounds());
    // dispatch(getAllScores());
  }, [game]);

  return (
    <div>
      <Nav signOut={signOutUser} />
      <Switch>
        <Route exact path="/">
          {loggedUser.user && loggedUser.user.firstname ? (
            <h1>hello, {loggedUser.user.firstname}!</h1>
          ) : (
            <div>
              <SignInButton>go sign up!</SignInButton>
            </div>
          )}
          <Home />
        </Route>
        <Route path="/current_game">
          <CurrentGame />
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/registration">
          {loggedUser.user && loggedUser.user.id ? (
            <Redirect to="/" />
          ) : (
            <Registration />
          )}
        </Route>
        <Route path="/new_game">
          <NewGame />
        </Route>
      </Switch>
    </div>
  );
}

// export default connect(null, { getUser })(App);
export default withRouter(App);
