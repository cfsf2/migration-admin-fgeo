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

const objetoQueryFiltrosdeF = (
  filtros,
  filtrosAAplicar,
  pantalla,
  quienLlama
) => {
  let queryfiltros = Object.assign(
    {
      pantalla: pantalla,
    },
    filtrosAAplicar
  );

  filtros.forEach((f) => {
    queryfiltros[f.id_a] = f.default;
    // eslint-disable-next-line no-unused-expressions
    f.sc_hijos?.forEach((fh) => {
      queryfiltros[fh.id_a] = fh.default;
    });
  });

  if (!filtrosAAplicar) return queryfiltros;

  const completarQueryFiltros = (queryfiltros, filtrosAAplicar, f) => {
    if (filtrosAAplicar[f.id_a] || filtrosAAplicar[f.id_a] === "") {
      if (typeof filtrosAAplicar[f.id_a] === "number") {
        queryfiltros[f.id_a] = filtrosAAplicar[f.id_a];
      }

      if (typeof filtrosAAplicar[f.id_a] === "string") {
        queryfiltros[f.id_a] = filtrosAAplicar[f.id_a]?.toString()?.trim();
      }

      if (Array.isArray(filtrosAAplicar[f.id_a])) {
        queryfiltros[f.id_a] = filtrosAAplicar[f.id_a]?.toString()?.trim();
      }
    }

    if (f.componente === "hidden") {
      queryfiltros[f.id_a] =
        filtrosAAplicar[f.id_a] ?? f.default ?? "filtro_hidden_sin_valor";
    }

    if (
      !queryfiltros[f.id_a] ||
      queryfiltros[f.id_a] === null ||
      queryfiltros[f.id_a]?.toString()?.trim() === "" || // esto sobreescribe los valores de string vacio y los convierte en undefined *** REVISAR
      filtrosAAplicar[f.id_a] === null
    ) {
      queryfiltros[f.id_a] = undefined;
    }

    if (f.sc_hijos.length > 0) {
      f.sc_hijos.forEach((h) =>
        completarQueryFiltros(queryfiltros, filtrosAAplicar, h)
      );
    }
  };

  filtros.forEach((f) => {
    completarQueryFiltros(queryfiltros, filtrosAAplicar, f);
  });
  return queryfiltros;
};

export const ListadoProvider = (props) => {
  const {
    configuracion,
    id,
    nollamar,
    children,
    modalProps,
    qsBody = {},
    subirDatosSeleccionados,
  } = props;

  let pantalla = configuracion.opciones.id_a; //ID_A de Listado

  const [display_container, setDisplay] = useState(
    configuracion.opciones.display_container
  );

  const [sideData, setSideData] = useState({});
  const addSideData = useCallback(({ clave_envio, valor }) => {
    setSideData((s) => {
      const newS = { ...s };
      newS[clave_envio] = valor;
      return newS;
    });
  }, []);

  const {
    pantalla: PPantalla,
    configuraciones_ref,
    PantallaDispatch,
  } = useContext(PantallaContext);

  const { requestErrorHandler } = useContext(FuncionesContext);

  const [state, dispatch] = useReducer(ListadoReducer, initialState);

  // const location = useLocation();
  // const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [carrusel, setCarrusel] = useState(false);

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

      // console.log("CallMF", filtrosAAplicar);
      // console.log("filtrs", _filtros);

      let queryfiltros = objetoQueryFiltrosdeF(
        _filtros,
        filtrosAAplicar,
        pantalla,
        "callMF"
      );

      dispatch({
        type: "SET_FILTRO_ACTIVO",
        payload: {
          filtros_de_conf: configuracion.filtros,
          filtros: queryfiltros,
          funcion: `callMF funcion ${quienLlama}`,
          debug: [
            "callMF_" + quienLlama,
            filtrosAAplicar,
            _filtros,
            Date.now(),
          ],
        },
      });
      const newBod = Object.assign(qsBody, sideData, modalProps?.qsBody);
      if (!newBod.id) {
        newBod.id = id; // pasa id al body
      }
      const res = await axios.post(
        farmageo_api + "/config/" + PPantalla,
        newBod,
        { params: queryfiltros }
      );
      if (res.status >= 400) {
        requestErrorHandler(res);
      }
      const datos = res.data?.datos?.meta
        ? res.data.datos.data
        : res.data.datos;

      dispatch({
        type: "SET_DATOS",
        payload: datos,
      });
      /////////////////////////////////////////////////////////
      // celdas ref ///////////////////////////////////////////
      const celdaresf = {};
      datos.forEach((d) => {
        res.data.cabeceras.forEach((c) => {
          celdaresf[c.id_a + d._key] = 1;
        });
      });
      dispatch({
        type: "SET_CELDAS_REF",
        payload: celdaresf,
      });
      //////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////
      dispatch({
        type: "SET_OPCIONES_LISTADO",
        payload: Object.assign(res.data.opciones, modalProps?.props),
      });

      setDisplay(() => res.data.opciones.display_container);

      if (res.data.opciones.listado_boton_update === "s") {
        dispatch({
          type: "SET_BOTONES_LISTADO",
          payload: res.data.listadoBotones,
        });
        setSideData(() => {
          return {};
        });
      }

      dispatch({
        type: "SOLO_SET_DATOS_SELECCIONADOS",
        payload: [],
      });

      PantallaDispatch({
        type: "ADD_SQL",
        payload: res.data.sql,
      });

      setCabeceras(res.data.cabeceras ? res.data.cabeceras : []);
      setFiltros(res.data.filtros ? res.data.filtros : []);

      setLoading(false);

      return res;
    },
    [PPantalla, filtros, id, pantalla, requestErrorHandler, state.id_global]
  );

  useEffect(() => {
    // if (modalProps?.props?.activarListado || qsBody.activarListado === "s") {
    if (qsBody.activarListado === "s") {
      // console.log(modalProps?.props)
      callMF({
        _filtros: filtros,
        filtrosAAplicar: Object.assign(
          state.filtroActivo,
          modalProps?.props?.filtrosDesdeInput,
          qsBody
        ),
        quienLlama: "useEffect modal",
      });
    }
    if (!configuraciones_ref[pantalla] || configuraciones_ref[pantalla] === 1)
      return; //useEffect para actualizar Listado a comando
    if (nollamar) return;
    // dispatch({ type: "SET_LOADING_PANTALLA", payload: true });

    callMF({
      _filtros: filtros,
      filtrosAAplicar: Object.assign(state.filtroActivo, { id }),
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
        payload: Object.assign(configuracion.opciones, modalProps?.props),
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

      const first_filtros = objetoQueryFiltrosdeF(
        configuracion.filtros,
        Object.assign(
          {}, //state.filtroActivo, // bug: este deja pegado los filtros
          modalProps?.props?.filtrosDesdeInput,
          qsBody
        ),
        pantalla,
        "firstRender"
      );

      dispatch({
        type: "SET_FILTRO_ACTIVO",
        payload: {
          filtros_de_conf: configuracion.filtros,
          filtros: first_filtros,
          funcion: `useEffect Listado PPantalla ${PPantalla}`,
          debug: [
            "firstRender",
            objetoQueryFiltrosdeF(
              configuracion.filtros,
              Object.assign(
                {}, //state.filtroActivo, // bug: este deja pegado los filtros
                modalProps?.props?.filtrosDesdeInput,
                qsBody
              )
            ),
            configuracion.filtros,
            Date.now(),
          ],
        },
      });

      firstRender.current = false;

      if (modalProps?.props?.activarListado) {
        // se activa el listado por medio de Modal
        // console.log(modalProps?.props)
        callMF({
          _filtros: filtros,
          filtrosAAplicar: first_filtros,
          quienLlama: "useEffect modal",
        });
      }
      return;
    }
  }, [1]);

  return (
    <>
      <ListadoContext.Provider
        value={useMemo(() => {
          //  console.log(state.filtroActivo);
          return {
            datos: state.datos,
            loading_pantalla: state.loading_pantalla,
            loading: loading,
            cabeceras: cabeceras,
            filtroActivo: state.filtroActivo,
            filtrosUsuarioAlCargarPagina: state.filtrosUsuarioAlCargarPagina,
            filtros: filtros,
            opcionesListado: state.opcionesListado,
            opciones: state.opcionesListado,
            listadoBotones: state.listadoBotones,
            datos_seleccionados: state.datos_seleccionados,
            id_global: state.id_global,
            setFilter: callMF, //pasar setQueryFilter para reaccionar a url}
            ListadoDispatch: dispatch,
            Dispatch: dispatch,
            dispatch: dispatch,
            addSideData,
            sideData,
            subirDatosSeleccionados,
            celdas: state.celdas,
            carrusel,
            setCarrusel,
          };
        }, [
          state.datos,
          state.loading_pantalla,
          state.filtroActivo,
          state.filtrosUsuarioAlCargarPagina,
          state.opcionesListado,
          state.listadoBotones,
          state.datos_seleccionados,
          state.id_global,
          state.celdas,
          loading,
          cabeceras,
          filtros,
          callMF,
          addSideData,
          sideData,
          subirDatosSeleccionados,
        ])}
      >
        {display_container === "n" ? (
          <></>
        ) : state.loading_pantalla ? (
          <div style={{ width: "100%", textAlign: "center" }}>Cargando...</div>
        ) : (
          children
        )}
      </ListadoContext.Provider>
    </>
  );
};

export default ListadoProvider;
