const getGameReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_GAME':
			return action.payload;
		case 'INIT_GAME':
			return {};
		default:
			return state;
	}
};

export default getGameReducer;
