import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from './actions';
import axios from 'axios';
import './App.css';

import { Nav } from './components/Nav/Nav';
import { Home } from './components/Home/Home';
import { CurrentGame } from './components/CurrentGame/CurrentGame';
import Leaderboard from './components/Leaderboard/Leaderboard';
import { Registration } from './components/Registration/Registration';

// STORE -> GLOBALIZED STATE
// ACTION
// REDUCER
// DISPATCH

function App() {
	const [user, setUser] = useState({});
	const isLogged = useSelector((state) => state.isLogged);
	const dispatch = useDispatch();

	const checkLoginStatus = () => {
		axios
			.get('http://localhost:3000/api/v1/logged_in', {
				withCredentials: true
			})
			.then((res) => {
				console.log('check log in?', res.data.logged_in);
				// console.log(user);
				if (res.data.logged_in && !user.id) {
					//   console.log(res.data.user);
					setUser(res.data.user);
					console.log(res.data.user);
				}
				// } else if (!res.data.logged_in && user.id) {
				// 	setUser({});
			})
			.catch((error) => {
				console.log(('error', error));
			});
	};

	const logout = async () => {
		// setUser({});
		dispatch(signOut());

		axios
			.delete('http://localhost:3000/api/v1/logout', { withCredentials: true })
			.catch((error) => {
				console.log('logout error', error);
			});
	};

	useEffect(checkLoginStatus, []);

	// const counter = useSelector((state) => state.counter);

	return (
		<div>
			{/* <h1>counter: {counter}</h1>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button> */}
			{isLogged ? <h3>you are logged in </h3> : <h3>have to log in to see</h3>}
			<Router>
				<Nav
					user={user}
					setUser={setUser}
					logout={logout}
					checkLoginStatus={checkLoginStatus}
				/>
				<Switch>
					<Route exact path="/">
						<Home user={user} />
					</Route>
					<Route path="/registration">
						{user.id ? <Redirect to="/" /> : <Registration setUser={setUser} />}
					</Route>
					{/* <Route path="/currentgame"> */}
					{/* <CurrentGame /> */}
					{/* </Route> */}
					{/* <Route path="/leaderboard"> */}
					{/* <Leaderboard /> */}
					{/* </Route> */}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
