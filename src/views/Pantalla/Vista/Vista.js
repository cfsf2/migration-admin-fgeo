import React, { useEffect, useReducer, useContext, useState } from "react";
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

  const id_a = configuracion.opciones.id_a;
  useEffect(() => {
    //useEffect para actualizar datos a control

    if (configuraciones_ref[id_a] === 1) return;

    if (nollamar) return;

    (async () => {
      setLoading(true);
      await getConfiguracion(id_a, id, {}).then((res) => {
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
        VistaDispatch: dispatch,
        Dispatch: dispatch,
      }}
    >
      {loading || loadingPantalla ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(200, 200, 200, 0.3)",
            zIndex: 30000,
          }}
        ></div>
      ) : (
        <>{children}</>
      )}
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
