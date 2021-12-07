const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_INSTITUCIONES":
      console.log("GET_INSTITUCIONES despachado");
      return {
        ...state,
        instituciones: action.payload,
      };
    default:
      return state;
  }
};
