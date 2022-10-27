export default function ABMReducer(state, action) {
  switch (action.type) {
    case "SET_FORMULARIO_VALOR": {
      const { id_a, valor } = action.payload;
      const formularioValor = state.formularioValor;

      formularioValor[id_a] = valor;
      return { ...state, formularioValor };
    }

    case "SET_FORMULARIO_INICIAL": {
      const { id_a, valor } = action.payload;
      const formularioInicial = { ...state.formularioInicial };

      formularioInicial[id_a] = valor;
      return { ...state, formularioInicial };
    }

    case "LIMPIAR_FORMULARIO": {
      return { ...state, formularioValor: { ...state.formularioInicial } };
    }

    case "SET_DATOS":
      return {
        ...state,
        datos: action.payload,
        formularioValor: {},
      };
    case "SET_CABECERAS":
      return {
        ...state,
        cabeceras: action.payload,
      };
    case "SET_FILTROS": {
      return {
        ...state,
        filtros: action.payload,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case "SET_OPCIONES": {
      return {
        ...state,
        opciones: action.payload,
      };
    }

    case "SET_ID_GLOBAL": {
      return {
        ...state,
        id_global: action.payload,
      };
    }
    case "SET_DATO_ESPECIFICO":
      const { value, indiceData, key } = action.payload;

      const nuevosDatos = state.datos;

      nuevosDatos[indiceData][key] = value;
      return {
        ...state,
        datos: nuevosDatos,
      };
    default:
      return state;
  }
}

export const initialState = {
  opcionesABM: {},
  datos: [],
  cabeceras: [],
  filtros: [],
  formularioValor: {},
  formularioInicial: {},
  loading: true,
};
