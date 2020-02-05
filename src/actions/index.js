import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// const dispatch = useDispatch();

export const signIn = () => {
	return {
		type: 'SIGN_IN'
	};
};

export const signOut = () => {
	return {
		type: 'SIGN_OUT'
	};
};

export const getUser = () => (dispatch, getState) => {
	// console.log(dispatch);
	// console.log(getState);
	axios
		.get('http://localhost:3000/api/v1/logged_in', {
			withCredentials: true
		})
		.then((res) => {
			console.log(res);
			console.log('check log in?', res.data.logged_in);
			if (res.data.logged_in) {
				//   console.log(res.data.user);
				//   setUser(res.data.user);
				//   console.log(res.data.user);
				dispatch(signIn());
				dispatch({
					type: 'GET_USER',
					payload: res.data.user
				});
			}
			// } else if (!res.data.logged_in && user.id) {
			// 	setUser({});
		})
		.catch((error) => {
			console.log(('error', error));
		});
	// Functional React components should return either JSX or React.createComponent()
};
