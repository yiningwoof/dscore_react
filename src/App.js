// api_key:

import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { increment } from './actions';
import './App.css';

import { Nav } from './components/Nav/Nav';
import { Home } from './components/Home/Home';
import { SignIn } from './components/SignIn/SignIn';
import { CurrentGame } from './components/CurrentGame/CurrentGame';
import Leaderboard from './components/Leaderboard/Leaderboard';

// STORE -> GLOBALIZED STATE
// ACTION
// REDUCER
// DISPATCH

function App() {
	const [user, setUser] = useState({});

	// const counter = useSelector((state) => state.counter);
	// const isLogged = useSelector((state) => state.isLogged);

	return (
		<div>
			{/* <h1>counter: {counter}</h1>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button>
			{isLogged ? <h3>you are logged in </h3> : <h3>have to log in to see</h3>} */}
			<Router>
				<Nav user={user} setUser={setUser} />
				<Switch>
					<Route exact path="/">
						<Home />
						{/* user={user} */}
					</Route>
					{/* <Route path="/signin"> */}
					{/* {user.id ? <Redirect to="/" /> : <SignIn setUser={setUser} />} */}
					{/* </Route> */}
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
