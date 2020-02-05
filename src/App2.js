import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut, getUser } from './actions';
import { connect } from 'react-redux';
import axios from 'axios';

import './App.css';

import { Nav } from './components/Nav/Nav';
import { Home } from './components/Home/Home';
import { CurrentGame } from './components/CurrentGame/CurrentGame';
import Leaderboard from './components/Leaderboard/Leaderboard';
import { Registration } from './components/Registration/Registration';
import { SignInButton } from './components/SignInButton/SignInButton';
import { NewGame } from './components/NewGame/NewGame';

// STORE -> GLOBALIZED STATE
// ACTION
// REDUCER
// DISPATCH

function App() {
	const isLogged = useSelector((state) => state.isLogged);
	const loggedUser = useSelector((state) => state.getUser);
	const dispatch = useDispatch();

	console.log(loggedUser);

	// const checkLoginStatus = () => {
	// 	x;
	// };

	const logout = async () => {
		// setUser({});
		dispatch(signOut());

		axios
			.delete('http://localhost:3000/api/v1/logout', { withCredentials: true })
			.catch((error) => {
				console.log('logout error', error);
			});
	};

	const getUserLoginStatus = () => {
		// console.log(getUser());
		// console.log(dispatch);
		dispatch(getUser());
	};

	useEffect(getUserLoginStatus, []);

	// const counter = useSelector((state) => state.counter);

	return (
		<div>
			<Router>
				<Nav
					logout={logout}
					// getUserLoginStatus={getUserLoginStatus}
				/>
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
					{/* <Route path="/currentgame"> */}
					{/* <CurrentGame /> */}
					{/* </Route> */}
					{/* <Route path="/leaderboard"> */}
					{/* <Leaderboard /> */}
					{/* </Route> */}
				</Switch>
			</Router>
			{/* <h1>counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button> */}
		</div>
	);
}

// export default connect(null, { getUser })(App);
export default App;
