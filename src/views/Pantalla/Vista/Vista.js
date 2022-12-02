import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  useRef,
} from "react";
import VistaContext from "./context/VistaContext";
import PantallaContext from "../context/PantallaContext";
import FuncionesContext from "../context/FuncionesContext";
import VistaReducer, { initialState } from "./context/VistaReducer";
import Tarjeta from "./components/Tarjeta";
import { useCallback } from "react";
import { useMemo } from "react";

const VistaProvider = ({ configuracion, id, children, nollamar, key }) => {
  const {
    configuraciones_ref,
    loadingPantalla,
    requestErrorHandler,
    PantallaDispatch,
  } = useContext(PantallaContext);
  const { getConfiguracion } = useContext(FuncionesContext);

  const [state, dispatch] = useReducer(VistaReducer, initialState);
  const [loading, setLoading] = useState(false);
  const id_a = configuracion.opciones.id_a;
  // Filtro de vista?
  const [filtros, setFiltros] = useState({
    pantalla: configuracion.opciones.id_a,
  });
  const filtrosp = useRef({ pantalla: configuracion.opciones.id_a });

  const setFiltro = useCallback(
    async ({ id_a, valor }) => {
      try {
        if (filtros.current) {
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

          return filtros.current;
        }

        if (!valor || valor === "") {
          setFiltros((f) => {
            let ns = { ...f };
            delete ns[id_a];
            return ns;
          });
        }

        setFiltros((f) => {
          // let ns = { ...f };
          // ns[id_a] = valor;
          return { ...f, [id_a]: valor };
        });
        return filtros;
      } catch (err) {
        console.log(err);
      }
    },
    [filtros]
  );

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
  }, [
    configuracion.cabeceras,
    configuracion.datos,
    configuracion.opciones,
    loadingPantalla,
  ]);

  useEffect(() => {
    //useEffect para actualizar datos a control

    if (configuraciones_ref[id_a] === 1) return;

    if (nollamar) return;

    (async () => {
      setLoading(true);

      await getConfiguracion(id_a, id, filtros).then((res) => {
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
      value={useMemo(() => {
        return {
          datos: state.datos,
          cabeceras: state.cabeceras,
          opciones: state.opciones,
          id: id,
          filtros,
          setFiltro,
          VistaDispatch: dispatch,
          Dispatch: dispatch,
          dispatch,
        };
      }, [
        filtros,
        id,
        setFiltro,
        state.cabeceras,
        state.datos,
        state.opciones,
      ])}
    >
      {loading || loadingPantalla ? (
        <div
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(200, 200, 200, 0.3)",
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

const Vista = ({ configuracion, id, nollamar, key }) => {
  return (
    <VistaProvider configuracion={configuracion} id={id} nollamar={nollamar}>
      <Tarjeta key={key} />
    </VistaProvider>
  );
};

export default Vista;
