const defaultState = {
  listaFarmacias: [],
  yaExiste: true,
  msj: "",
  usuarios: null,
  passwordsFarmacias: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_FARMACIAS":
      return {
        ...state,
        listaFarmacias: action.payload,
      };
    case "CHEQUEAR_SI_EXISTE":
      return {
        ...state,
        yaExiste: action.payload.yaExiste,
        msj: action.payload.msj,
      };
    case "GET_USUARIOS_APP":
      return {
        ...state,
        usuarios: action.payload,
      };
    case "GET_PASSWORDS_FARMACIAS":
      return {
        ...state,
        passwordsFarmacias: action.payload,
      };
    case "LOGOUT":
      return {
        listaFarmacias: [],
        yaExiste: true,
        msj: "",
        usuarios: null,
        passwordsFarmacias: null,
      };

    default:
      return state;
  }
};
