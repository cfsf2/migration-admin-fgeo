export default function PantallaReducer(state, action) {
  switch (action.type) {
    case "SET_CONFIGURACIONES":
      return {
        ...state,
        configuraciones: action.payload,
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
  filtrosAplicados: {},
  sql: [],
};
