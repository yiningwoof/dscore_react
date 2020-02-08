const getScoresReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_SCORES':
			return { ...state, scores: action.payload };
		default:
			return state;
	}
};

export default getScoresReducer;
