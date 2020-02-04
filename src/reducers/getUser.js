const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, user: action.payload };
    default:
      return {};
  }
};

export default getUserReducer;
