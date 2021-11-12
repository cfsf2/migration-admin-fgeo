const defaultState = {
  usuario: null,
  load: false,
  fin: false,
  usuarios: [],
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
        usuario: null,
        load: false,
        fin: false,
        usuarios: [],
        show_modal_adddedit: false,
      };
    case "DELETE_USUARIO":
      return {
        ...state,
      };
  }
};
