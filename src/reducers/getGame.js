const getGameReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_GAME":
      return action.payload;
    default:
      return state;
  }
};

export default getGameReducer;
