const getGameDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_GAME_DATA":
      // console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default getGameDataReducer;
