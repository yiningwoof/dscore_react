const getAllScoresReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_SCORES":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default getAllScoresReducer;
