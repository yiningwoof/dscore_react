const getHolesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_HOLES":
      console.log("from action ", action.payload);
      return [action.payload];
    default:
      return [];
  }
};

export default getHolesReducer;
