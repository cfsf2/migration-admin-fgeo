const defaultState = {
  campanas: [],
  campanas_activas: [],
  loading: false,
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
    case "CAMPANAS_ACTIVAS": 
      return {
        ...state,
        campanas_activas: action.payload,
        loading: false,
      };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
        };
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
        loading: false,
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
    case "FINALIZAR_REQUERIMIENTO":
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
