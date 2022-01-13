const defaultState = {
  publicidades: [],
  comunicadoTransfers: "{...}",
  novedades: [],
  editable: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_PUBLICIDADES":
      return {
        ...state,
        publicidades: action.payload,
        comunicadoTransfers: action.payload.filter((c) => {
          return c.tipo === "comunicadoTransfers";
        })[0].descripcion,
      };
    case "LOGOUT":
      return {
        publicidades: [],
      };
    case "COMUNICADO_TRANSFERS":
      return {
        ...state,
        comunicadoTransfers: action.payload,
      };
    case "SET_NOVEDAD_EDITABLE":
      return { ...state, editable: action.payload };
    case "GET_NOVEDADES":
      return { ...state, novedades: action.payload };
    default:
      return state;
  }
};
