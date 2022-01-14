const defaultState = {
  producto: null,
  load: false,
  fin: false,
  productos: [],
  show_modal_adddedit: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_PRODUCTO":
      return {
        ...state,
        producto: action.payload,
        load: true,
      };
    case "GET_PRODUCTOS":
      return {
        ...state,
        productos: action.payload,
      };
    case "OPEN_MODAL_ADDEDIT":
      return {
        ...state,
        show_modal_adddedit: true,
      };
    case "CLOSE_MODAL_ADDEDIT":
      return {
        ...state,
        show_modal_adddedit: false,
      };
    case "LOGOUT":
      return {
        producto: null,
        load: false,
        fin: false,
        productos: [],
        show_modal_adddedit: false,
      };

    default:
      return state;
  }
};
