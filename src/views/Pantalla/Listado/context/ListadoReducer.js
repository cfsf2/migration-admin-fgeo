export default function ListadoReducer(state, action) {
  switch (action.type) {
    case "SET_DATOS":
      return {
        ...state,
        datos: action.payload ?? [],
      };

    case "SET_DATOS_SELECCIONADOS":
      return {
        ...state,
        datos: action.payload.data,
        datos_seleccionados: action.payload.row ?? [],
      };
    case "SOLO_SET_DATOS_SELECCIONADOS":
      return {
        ...state,
        datos_seleccionados: action.payload ?? [],
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
      //console.log(action.payload.debug);

      const filtrosDeConfIds =
        action.payload.filtros_de_conf?.map((conf) => conf.id_a) ?? [];

      const filtrados = Object.keys(action.payload.filtros).reduce(
        (obj, key) => {
          if (filtrosDeConfIds.includes(key)) {
            obj[key] = action.payload.filtros[key];
          }
          return obj;
        },
        {}
      );

      // console.log(filtrados);
      return {
        ...state,
        filtroActivo: filtrados,
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

      const nuevosDatos = state.datos.map((d) => d);

      nuevosDatos[indiceData][key] = value;
      return {
        ...state,
        datos: nuevosDatos,
      };

    case "REFRESCAR_CELDA":
      return {
        ...state,
        celdas: {
          ...state.celdas,
          [action.payload.id]: state.celdas[action.payload.id] + 1,
        },
      };

    case "SET_CELDAS_REF":
      return {
        ...state,
        celdas: action.payload,
      };

    case "SET_CELDA_REF":
      return {
        ...state,
        celdas: {
          ...state.celdas,
          [action.payload.id]: 1,
        },
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
  datos_seleccionados: [],
  celdas: {},
};
