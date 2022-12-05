export default function ListadoReducer(state, action) {
  switch (action.type) {
    case "SET_DATOS":
      return {
        ...state,
        datos: action.payload ?? [],
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
    case "SET_LOADING_PANTALLA": {
      return {
        ...state,
        loading_pantalla: action.payload,
      };
    }

    case "SET_BOTONES_LISTADO": {
      return {
        ...state,
        listadoBotones: action.payload,
      };
    }

    case "SET_FILTRO_ACTIVO": {
      return {
        ...state,
        filtroActivo: action.payload.filtros,
      };
    }
    case "SET_FILTRO_USUARIO_AL_CARGAR_PAGINA": {
      return {
        ...state,
        filtrosUsuarioAlCargarPagina: action.payload ? action.payload : {},
      };
    }
    case "SET_OPCIONES_LISTADO": {
      return {
        ...state,
        opcionesListado: action.payload,
      };
    }
    case "SET_OPCIONES_PANTALLA": {
      return {
        ...state,
        opcionesPantalla: action.payload,
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
  opcionesListado: {},
  opcionesPantalla: undefined,
  datos: [],
  cabeceras: [],
  filtros: [],
  filtroActivo: {},
  loading_pantalla: true,
  filtrosUsuario: {},
};
