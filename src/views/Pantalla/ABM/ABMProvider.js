import React, { useContext, useEffect, useState, useReducer } from "react";

import ABMContext from "./context/ABMContext";
import ABMReducer, { initialState } from "./context/ABMReducer";
import PantallaContext from "../context/PantallaContext";
import FuncionesContext from "../context/FuncionesContext";

const ABMProvider = ({ configuracion, id, children, nollamar }) => {
  const { configuraciones_ref, loadingPantalla } = useContext(PantallaContext);
  const { getConfiguracion, ABMSubmit, requestErrorHandler } =
    useContext(FuncionesContext);

  const [state, dispatch] = useReducer(ABMReducer, initialState);
  const [load, setLoad] = useState(true);

  const [loading, setLoading] = useState(true);

  const id_a = configuracion.opciones.id_a;

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

    configuracion.datos.forEach((dato) => {
      configuracion.cabeceras.forEach((cab) => {
        return dispatch({
          type: "SET_FORMULARIO_VALOR",
          payload: { id_a: cab.id_a, valor: dato[cab.id_a] },
        });
      });
    });

    setLoading(false);
  }, [loadingPantalla, id]);

  useEffect(() => {
    configuracion.datos.forEach((dato) => {
      configuracion.cabeceras.forEach((cab) => {
        dispatch({
          type: "SET_FORMULARIO_INICIAL",
          payload: { id_a: cab.id_a, valor: dato[cab.id_a] },
        });
      });
    });
  }, [load]);

  const callAPI = async ({ params }) => {
    setLoading(true);
    await getConfiguracion(id_a, id, params).then((res) => {
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
      setLoading(false);
    });
  };

  const guardarAPI = async ({ params }) => {
    //  setLoading(true);
    await ABMSubmit({
      id_a,
      id,
      params,
      opciones: configuracion.opciones,
      setLoading,
    })
      .then((res) => {
        if (res.status >= 400) {
          requestErrorHandler(res);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    //useEffect para actualizar datos a control
    if (configuraciones_ref[id_a] === 1) return;

    if (nollamar) return;
    callAPI({});
  }, [configuraciones_ref[id_a]]);

  return (
    <ABMContext.Provider
      value={{
        datos: state.datos,
        cabeceras: state.cabeceras,
        opciones: state.opciones,
        valorFormulario: state.formularioValor,
        formularioInicial: state.formularioInicial,
        state,
        id,
        loading,
        ABMDispatch: dispatch,
        Dispatch: dispatch,
        callAPI,
        guardarAPI,
      }}
    >
      {loading ? (
        <div
          style={{
            backgroundColor: "rgba(200,150,100,0.5)",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 2000,
            cursor: "wait",
          }}
        >
          CARGANDO....
        </div>
      ) : (
        <></>
      )}
      {children}
    </ABMContext.Provider>
  );
};

export default ABMProvider;
