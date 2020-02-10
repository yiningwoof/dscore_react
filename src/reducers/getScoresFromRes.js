const getScoresFromResReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SCORES_FROM_RES":
      return [...state, action.payload.data];
    default:
      return state;
  }
};

export default getScoresFromResReducer;
