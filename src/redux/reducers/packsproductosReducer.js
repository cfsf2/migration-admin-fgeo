const defaultState = {
  solicitudesproveeduria: [],
  entidades: [],
  categorias: [],
  productos: [],
  entidad_selected: null,
  submitting: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_SOLICITUDES_PROVEEDURIA":
      return {
        ...state,
        solicitudesproveeduria: action.payload,
      };
    case "GET_ENTIDADES":
      return {
        ...state,
        entidades: action.payload,
      };
    case "GET_CATEGORIAS":
      return {
        ...state,
        categorias: action.payload,
      };
    case "GET_PRODUCTOS_PACK":
      return {
        ...state,
        productos: action.payload,
      };

    case "SET_ENTIDAD_SELECTED":
      return {
        ...state,
        entidad_selected: action.payload,
      };
    case "SUBMITTING":
      return {
        ...state,
        submitting: action.payload,
      };

    default:
      return state;
  }
};
