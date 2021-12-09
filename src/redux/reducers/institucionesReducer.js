const defaultState = {
  instituciones: [],
  busqueda: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_INSTITUCIONES":
      console.log("GET_INSTITUCIONES despachado");
      return {
        ...state,
        instituciones: action.payload,
      };
      break;
    case "SEARCH_INSTITUCIONES":
      console.log("SEARCH_INSTITUCIONES despachado");
      return {
        ...state,
        busqueda: action.payload,
      };
      break;
    default:
      return state;
  }
};
