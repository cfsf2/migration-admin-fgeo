const defaultState = {
  usuario: {},
  load: false,
  fin: false,
  usuarios: null,
  show_modal_adddedit: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_USUARIO":
      return {
        ...state,
        usuario: action.payload,
        load: true,
      };
    case "GET_USUARIOS":
      return {
        ...state,
        usuarios: action.payload,
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
        usuario: {},
        load: false,
        fin: false,
        usuarios: [],
        show_modal_adddedit: false,
      };
    case "DELETE_USER":
      return {
        ...state,
      };
    case "CREATE_USER":
      return;
    case "CANCEL":
      return;
    default:
      return state;
  }
};
