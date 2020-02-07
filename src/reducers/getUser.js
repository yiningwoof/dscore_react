const getUserReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_USER':
			return { ...state, user: action.payload };
		case 'SIGN_OUT':
			return {};
		default:
			return state;
	}
};

export default getUserReducer;
