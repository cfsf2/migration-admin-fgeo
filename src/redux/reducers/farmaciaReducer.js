const defaultState = {
  farmacia: null,
  load: false,
  fin: false,
  farmacias: [],
  show_modal_adddedit: false,
};

export default (state = defaultState, action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case "LOADING_FARMACIA":
      return {
        ...state,
        load: false,
      };
    case "GET_FARMACIA":
      return {
        ...state,
        farmacia: action.payload,
        load: true,
      };
    case "GET_FARMACIAS":
      return {
        ...state,
        farmacias: action.payload,
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
        farmacia: null,
        load: false,
        fin: false,
        farmacias: [],
        show_modal_adddedit: false,
      };
    default:
      return state;
  }
};
