import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import VistaContext from "./context/VistaContext";
import PantallaContext from "../context/PantallaContext";
import FuncionesContext from "../context/FuncionesContext";
import VistaReducer, { initialState } from "./context/VistaReducer";
import Tarjeta from "./components/Tarjeta";

const VistaProvider = ({ configuracion, id, children, nollamar }) => {
  const {
    configuraciones_ref,
    loadingPantalla,
    requestErrorHandler,
    PantallaDispatch,
  } = useContext(PantallaContext);
  const { getConfiguracion } = useContext(FuncionesContext);

  const [state, dispatch] = useReducer(VistaReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [id_a, set_ida] = useState(configuracion.opciones.id_a);
  // Filtro de vista?
  const [filtrosp, setFiltros] = useState({
    pantalla: configuracion.opciones.id_a,
  });
  const filtros = useRef({ pantalla: configuracion.opciones.id_a });

  const setFiltro = useCallback(async ({ id_a, valor }) => {
    try {
      if (filtros.current) {
        console.log("estamos usando useRef", filtros.current);
        if (!valor || valor === "") {
          // setFiltros
          filtros.current = (() => {
            let ns = { ...filtros.current };
            delete ns[id_a];
            return ns;
          })();
        }

        // setFiltros
        filtros.current = (() => {
          let ns = { ...filtros.current };
          ns[id_a] = valor;
          return ns;
        })();
        console.log("setfiltro llamado", filtros.current);
        return;
      }
      console.log("estamos usando useState", filtros);
      if (!valor || valor === "") {
        setFiltros((f) => {
          let ns = { ...f };
          delete ns[id_a];
          return ns;
        });
      }

      setFiltros((f) => {
        let ns = { ...f };
        ns[id_a] = valor;
        return ns;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: "SET_CABECERAS",
      payload: configuracion.cabeceras,
    });
    dispatch({
      type: "SET_DATOS",
      payload: configuracion.datos,
    });
    dispatch({
      type: "SET_OPCIONES",
      payload: configuracion.opciones,
    });
  }, [loadingPantalla]);

  useEffect(() => {
    //useEffect para actualizar datos a control

    if (configuraciones_ref[id_a] === 1) return;
    console.log("Refresh de  ", configuracion.opciones.id_a, filtros);
    if (nollamar) return;

    (async () => {
      setLoading(true);

      await getConfiguracion(id_a, id, filtros.current).then((res) => {
        if (res.status >= 400) {
          requestErrorHandler(res);
        }
        dispatch({
          type: "SET_CABECERAS",
          payload: res.data.cabeceras,
        });
        dispatch({
          type: "SET_DATOS",
          payload: res.data.datos,
        });
        dispatch({
          type: "SET_OPCIONES",
          payload: res.data.opciones,
        });

        PantallaDispatch({
          type: "ADD_SQL",
          payload: res.data.sql,
        });

        setLoading(false);
      });
    })();
  }, [configuraciones_ref[id_a]]);

  return (
    <VistaContext.Provider
      value={{
        datos: state.datos,
        cabeceras: state.cabeceras,
        opciones: state.opciones,
        id: id,
        filtros,
        setFiltro,
        VistaDispatch: dispatch,
        Dispatch: dispatch,
        dispatch,
      }}
    >
      {loading || loadingPantalla ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(200, 200, 200, 0.1)",
            zIndex: 30000,
          }}
        ></div>
      ) : (
        <></>
      )}
      <>{children}</>
    </VistaContext.Provider>
  );
};

const Vista = ({ configuracion, id, nollamar }) => {
  return (
    <VistaProvider configuracion={configuracion} id={id} nollamar={nollamar}>
      <Tarjeta />
    </VistaProvider>
  );
};

export default Vista;
