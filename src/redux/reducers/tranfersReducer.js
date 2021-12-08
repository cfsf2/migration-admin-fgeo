const defaultState = {
  transfers: [],
  laboratorios: [],
  droguerias: [],
  productos: [],
  pedido: [],
  lab_selected: null,
  submitting: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_TRANSFERS":
      return {
        ...state,
        transfers: action.payload,
      };
    case "GET_LABORATORIOS":
      return {
        ...state,
        laboratorios: action.payload,
      };
    case "GET_DROGUERIAS":
      return {
        ...state,
        droguerias: action.payload,
      };
    case "GET_PRODUCTOS_TRANSFERS":
      return {
        ...state,
        productos: action.payload,
      };
    case "SET_LABORATORIO_SELECTED":
      return {
        ...state,
        lab_selected: action.payload,
      };
    case "SUBMITTING":
      return {
        ...state,
        submitting: action.payload,
      };
    case "SET_PEDIDO":
      return {
        ...state,
        pedido: action.payload,
      };

    default:
      return state;
  }
};
