const getAllRoundsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_ROUNDS":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default getAllRoundsReducer;
