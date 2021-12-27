const defaultState = {
  mis_pedidos: [],
  ver_pedido: {},
  socio: null,
  loading: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_PEDIDOS":
      return {
        ...state,
        mis_pedidos: action.payload,
        loading: false,
      };
    case "VER_PEDIDO":
      return {
        ...state,
        ver_pedido: action.payload,
        loading: false,
      };
    case "GET_INFO_SOCIO":
      return {
        ...state,
        socio: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        mis_pedidos: [],
        ver_pedido: {},
        socio: null,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
