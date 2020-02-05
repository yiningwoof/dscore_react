const getPlayerNamesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_PLAYERNAMES':
			return action.payload;
		default:
			return {};
	}
};

export default getPlayerNamesReducer;
