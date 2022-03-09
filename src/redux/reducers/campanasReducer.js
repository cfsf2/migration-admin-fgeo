const defaultState = {
  campanas: [],
  loading_camp: false,
  requerimientos: [],
  loading_req: false,
  requerimientos_filtro: {
    id_campana: "todas",
    finalizado: "todas",
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "REQUERIMIENTOS":
      return {
        ...state,
        requerimientos: action.payload,
        loading_req: false,
      };
    case "CAMPANAS":
      return {
        ...state,
        campanas: action.payload,
        loading_camp: false,
      };
    case "SET_REQUERIMIENTOS_FILTRO":
      return {
        ...state,
        requerimientos_filtro: action.payload,
      };
    case "SET_LOADING_REQ":
      return {
        ...state,
        loading_req: action.payload,
      };
    case "UPDATE_REQUERIMIENTO":
      return {
        ...state,
        requerimientos: state.requerimientos.map((r) =>
          r._id === action.payload.id
            ? { ...r, finalizado: action.payload.finalizado }
            : r
        ),
      };

    default:
      return state;
  }
};
