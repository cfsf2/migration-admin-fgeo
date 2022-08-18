import axios from "axios";
import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { farmageo_api } from "../../../config";

import ListadoContext from "./context/ListadoContext";
import PantallaContext from "../context/PantallaContext";

import FuncionesContext from "../context/FuncionesContext";
import ListadoReducer, { initialState } from "./context/ListadoReducer";

// const objetoQueryFiltrosdeURL = (filtros, pantalla) => {
//   const params = new URLSearchParams(window.location.href);
//   let queryfiltros = {
//     pantalla: pantalla,
//   };
//   filtros.forEach((f) => (queryfiltros[f.id_a] = params.get(f.id_a)));
//   return queryfiltros;
// };

const objetoQueryFiltrosdeF = (filtros, filtrosAAplicar, pantalla) => {
  let queryfiltros = {
    pantalla: pantalla,
  };

  filtros.forEach((f) => {
    queryfiltros[f.id_a] = f.default;
  });

  if (!filtrosAAplicar) return queryfiltros;

  filtros.forEach((f) => {
    if (filtrosAAplicar[f.id_a] || filtrosAAplicar[f.id_a] === "") {
      queryfiltros[f.id_a] = filtrosAAplicar[f.id_a]?.toString()?.trim();
    }
    if (
      !queryfiltros[f.id_a] ||
      queryfiltros[f.id_a] === null ||
      queryfiltros[f.id_a]?.toString()?.trim() === "" // esto sobreescribe los valores de string vacio y los convierte en undefined *** REVISAR
    )
      queryfiltros[f.id_a] = undefined;
  });
  return queryfiltros;
};

export const ListadoProvider = ({ configuracion, id, nollamar, children }) => {
  let pantalla = configuracion.opciones.id_a; //ID_A de Listado

  const { pantalla: PPantalla, configuraciones_ref } =
    useContext(PantallaContext);

  const { requestErrorHandler } = useContext(FuncionesContext);

  const [state, dispatch] = useReducer(ListadoReducer, initialState);

  // const location = useLocation();
  // const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [cabeceras, setCabeceras] = useState([]);
  const [filtros, setFiltros] = useState([]);

  const firstRender = useRef(true);

  useEffect(() => {
    dispatch({ type: "SET_LOADING_PANTALLA", payload: true });
    dispatch({
      type: "SET_ID_GLOBAL",
      payload: id,
    });

    const filtrosUsuario =
      configuracion.opciones.configuracionDeUsuario?.detalles
        .filter((d) => d.conf.tipo.id === 3)
        .map((fu) => {
          return { [fu.conf.id_a]: fu.default };
        })[0];

    dispatch({
      type: "SET_FILTRO_USUARIO_AL_CARGAR_PAGINA",
      payload: filtrosUsuario,
    });

    if (
      configuracion.opciones.configuracion_usuario_activo === "s" &&
      configuracion.opciones.configuracionDeUsuario?.iniciar_activo === "s"
    ) {
      if (nollamar) return;

      callMF({
        filtrosAAplicar: filtrosUsuario,
        _filtros: configuracion.filtros,
        quienLlama: "useEffect Listado id pantalla",
      });
    }
  }, [id, pantalla]);

  const callMF = useCallback(
    async ({ filtrosAAplicar, _filtros, quienLlama }) => {
      if (!_filtros) _filtros = filtros;
      setLoading(true);
      // setQueryFilter(filtrosAAplicar);

      let queryfiltros = objetoQueryFiltrosdeF(
        _filtros,
        filtrosAAplicar,
        pantalla
      );

      dispatch({
        type: "SET_FILTRO_ACTIVO",
        payload: {
          filtros: queryfiltros,
          funcion: `callMF funcion ${quienLlama}`,
        },
      });

      const res = await axios.post(
        farmageo_api + "/config/" + PPantalla,
        { id: state.id_global ? state.id_global : id },
        { params: queryfiltros }
      );
      if (res.status >= 400) {
        requestErrorHandler(res);
      }
      dispatch({
        type: "SET_DATOS",
        payload: res.data?.datos?.meta ? res.data.datos.data : res.data.datos,
      });
      dispatch({
        type: "SET_OPCIONES_LISTADO",
        payload: res.data.opciones,
      });

      dispatch({
        type: "SET_BOTONES_LISTADO",
        payload: res.data.listadoBotones,
      });

      setCabeceras(res.data.cabeceras ? res.data.cabeceras : []);
      setFiltros(res.data.filtros ? res.data.filtros : []);
      setLoading(false);
      return res;
    },
    [PPantalla, filtros, id, pantalla, requestErrorHandler, state.id_global]
  );

  useEffect(() => {
    if (configuraciones_ref[pantalla] === 1) return; //useEffect para actualizar Listado a comando
    if (nollamar) return;

    // dispatch({ type: "SET_LOADING_PANTALLA", payload: true });

    callMF({
      _filtros: filtros,
      filtrosAAplicar: state.filtroActivo,
      quienLlama: "useEffect refrescante",
    });
  }, [configuraciones_ref[pantalla]]);

  useEffect(() => {
    setLoading(true);
    if (firstRender.current) {
      dispatch({
        type: "SET_DATOS",
        payload: configuracion.datos.meta
          ? configuracion.datos.data
          : configuracion.datos,
      });

      setCabeceras(configuracion.cabeceras ? configuracion.cabeceras : []);
      setFiltros(configuracion.filtros ? configuracion.filtros : []);

      dispatch({
        type: "SET_OPCIONES_LISTADO",
        payload: configuracion.opciones,
      });

      dispatch({
        type: "SET_BOTONES_LISTADO",
        payload: configuracion.listadoBotones,
      });

      dispatch({
        type: "SET_LOADING_PANTALLA",
        payload: false,
      });

      setLoading(false);

      dispatch({
        type: "SET_FILTRO_ACTIVO",
        payload: {
          filtros: objetoQueryFiltrosdeF(
            configuracion.filtros,
            state.filtroActivo,
            pantalla
          ),
          funcion: `useEffect Listado PPantalla ${PPantalla}`,
        },
      });

      firstRender.current = false;
      return;
    }
  }, []);

  return (
    <>
      <ListadoContext.Provider
        value={useMemo(() => {
          return {
            datos: state.datos,
            loading_pantalla: state.loading_pantalla,
            loading: loading,
            cabeceras: cabeceras,
            filtroActivo: state.filtroActivo,
            filtrosUsuarioAlCargarPagina: state.filtrosUsuarioAlCargarPagina,
            filtros: filtros,
            opcionesListado: state.opcionesListado,
            listadoBotones: state.listadoBotones,
            id_global: state.id_global,
            setFilter: callMF, //pasar setQueryFilter para reaccionar a url}
            ListadoDispatch: dispatch,
          };
        }, [
          state.datos,
          state.loading_pantalla,
          state.filtroActivo,
          state.filtrosUsuarioAlCargarPagina,
          state.opcionesListado,
          state.listadoBotones,
          state.id_global,
          loading,
          cabeceras,
          filtros,
          callMF,
        ])}
      >
        {state.loading_pantalla ? (
          <div style={{ width: "100%", textAlign: "center" }}>Cargando...</div>
        ) : (
          children
        )}
      </ListadoContext.Provider>
    </>
  );
};

export default ListadoProvider;
