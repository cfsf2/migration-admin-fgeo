const defaultState = {
  transfers: [],
  laboratorios: [],
  categorias: [],
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
      const categorias = action.payload.categorias.sort(
        (a, b) => a.orden - b.orden
      );
      const laboratorios = action.payload.laboratorios.sort(
        (a, b) => a.nombre - b.nombre
      );
      return {
        ...state,
        categorias: categorias,
        laboratorios: laboratorios,
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
    case "SET_TOTAL_AHORRO":
      return {
        ...state,
        transfer: {
          ...state.transfer,
          total: action.payload.total,
          ahorro: action.payload.ahorro,
        },
      };
    default:
      return state;
  }
};
