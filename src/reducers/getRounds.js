const getRoundsReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_ROUNDS':
			return [...state, action.payload];
		case 'INIT_ROUNDS':
			console.log('initializing rounds...');
			return [];
		default:
			return state;
	}
};

export default getRoundsReducer;
