const getGameReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_GAME':
			console.log(action.payload);
			return action.payload;
		default:
			return state;
	}
};

export default getGameReducer;
