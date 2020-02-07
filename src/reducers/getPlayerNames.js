const getPlayerNamesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_PLAYERNAMES':
			return action.payload;
		default:
			return state;
	}
};

export default getPlayerNamesReducer;
