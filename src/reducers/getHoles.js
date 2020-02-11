const getHolesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_HOLES":
      return action.payload;
    default:
      return state;
  }
};

export default getHolesReducer;
