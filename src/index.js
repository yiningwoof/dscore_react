import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App2';
import * as serviceWorker from './serviceWorker';
import allReducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// connects store to entire app

const initialState = {};
const middleware = [thunk];

const store = createStore(
	allReducers,
	initialState,
	applyMiddleware(...middleware)
	// allReducers,
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// ReactDOM.render(
// 	<Provider store={store}>
// 		<App />
// 	</Provider>
// );

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
