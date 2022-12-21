export default function PantallaReducer(state, action) {
  switch (action.type) {
    case "SET_CONFIGURACIONES":
      return {
        ...state,
        configuraciones: action.payload,
      };

    case "ADD_CONFIGURACION":
      // aniade conf para funcion de renderizado
      let nc = state.configuraciones;
      nc.push(action.payload);

      // aniade conf para funcion refrescar
      let nrc = { ...state.configuraciones_ref };
      let nri = { ...state.configuraciones_ids };
      (() => {
        const data = action.payload;

        nrc[data.opciones.id_a] = Number(1);
        nri[data.opciones.id_a] = data.opciones.id;

        const goConf = (cab) => {
          if (!cab.sc_hijos) return;
          return cab.sc_hijos?.forEach((sc) => {
            nrc[sc.id_a] = Number(1);
            nri[sc.id_a] = sc.id;
            goConf(sc.sc_hijos);
          });
        };

        data.configuraciones.forEach((c) => {
          nrc[c.opciones.id_a] = Number(1);
          nri[c.opciones.id_a] = c.opciones.id;

          // eslint-disable-next-line no-unused-expressions
          c.configuraciones?.forEach((sc) => {
            nrc[sc.opciones.id_a] = Number(1);
            nri[sc.opciones.id_a] = sc.opciones.id;
            // eslint-disable-next-line no-unused-expressions
            sc.cabeceras?.forEach((scc) => {
              nrc[scc.id_a] = Number(1);
              nri[scc.id_a] = scc.id;
              goConf(scc);
            });
          });
          return;
        });
      })();

      return {
        ...state,
        configuraciones: nc,
        configuraciones_ref: nrc,
        configuraciones_ids: nri,
      };

    case "KILL_CONFIGURACION":
      let ncc = state.configuraciones;
      let cindx = ncc.findIndex((c) => c.opciones.id_a === action.payload);
      ncc.splice(cindx, 1);

      return {
        ...state,
        configuraciones: ncc,
      };

    case "SET_OPCIONES_DE_PANTALLA":
      return {
        ...state,
        opciones_de_pantalla: action.payload,
      };

    case "SET_PANTALLA":
      return {
        ...state,
        pantalla: action.payload,
      };

    case "SET_PANTALLA_ID":
      return {
        ...state,
        pantalla_id: action.payload,
      };

    case "SET_CONFIGURACIONES_REF":
      const configuraciones_ida = {};
      const configuraciones_ids = {};

      const data = action.payload;

      configuraciones_ida[data.opciones.id_a] = Number(1);
      configuraciones_ids[data.opciones.id_a] = data.opciones.id;

      const goConf = (cab) => {
        if (!cab.sc_hijos) return;
        return cab.sc_hijos?.forEach((sc) => {
          configuraciones_ida[sc.id_a] = Number(1);
          configuraciones_ids[sc.id_a] = sc.id;
          goConf(sc.sc_hijos);
        });
      };

      data.configuraciones.forEach((c) => {
        configuraciones_ida[c.opciones.id_a] = Number(1);
        configuraciones_ids[c.opciones.id_a] = c.opciones.id;

        // eslint-disable-next-line no-unused-expressions
        c.configuraciones?.forEach((sc) => {
          configuraciones_ida[sc.opciones.id_a] = Number(1);
          configuraciones_ids[sc.opciones.id_a] = sc.opciones.id;
          // eslint-disable-next-line no-unused-expressions
          sc.cabeceras?.forEach((scc) => {
            configuraciones_ida[scc.id_a] = Number(1);
            configuraciones_ids[scc.id_a] = scc.id;
            goConf(scc);
          });
        });

        return c.cabeceras?.forEach((sc) => {
          configuraciones_ida[sc.id_a] = Number(1);
          configuraciones_ids[sc.id_a] = sc.id;
          goConf(sc);
        });
      });

      return {
        ...state,
        configuraciones_ref: configuraciones_ida,
        configuraciones_ids: configuraciones_ids,
      };

    case "REFRESCAR":
      return {
        ...state,
        configuraciones_ref: {
          ...state.configuraciones_ref,
          [action.payload]: state.configuraciones_ref[action.payload] + 1,
        },
      };

    case "SET_FILTROS_APLICADOS": // de momento no se usa. Se usa SET_FILTRO_ACTIVO en context de listado
      if (!action.payload) return state;
      const filtrosAAplicar = action.payload.filtrosAAplicar;
      const id_a = action.payload.id_a;

      const nuevosFiltros = state.filtrosAplicados;

      nuevosFiltros[id_a] = filtrosAAplicar;

      return {
        ...state,
        filtrosAplicados: nuevosFiltros,
      };

    case "SET_DATOS_CONF":
      const newState = { ...state };

      console.log(action);

      newState.configuraciones[action.payload.idx] =
        action.payload.configuracion;

      return newState;

    case "ADD_SQL":
      let newSql = [...state.sql];

      newSql = newSql.concat(action.payload).filter((s) => s);
      return {
        ...state,
        sql: newSql,
      };

    default:
      return state;
  }
}

export const initialState = {
  configuraciones: [],
  opciones_de_pantalla: {},
  configuraciones_ref: {},
  configuraciones_ids: {},
  filtrosAplicados: {},
  sql: [],
};
