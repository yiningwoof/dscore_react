const updateHoleScoresReducer = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_HOLE_SCORES':
			return {
				...state,
				...action.payload
			};
		case 'INIT_SCORES':
			return {};
		default:
			return state;
	}
};

export default updateHoleScoresReducer;
