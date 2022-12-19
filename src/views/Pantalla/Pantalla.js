import React, { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";

import { farmageo_api } from "../../config";
import { v4 as uuidv4 } from "uuid";

import PantallaContext from "./context/PantallaContext";
import { requestErrorHandler } from "./context/FuncionesContext";
import { FuncionesProvider } from "./context/FuncionesContext";
import PantallaReducer, { initialState } from "./context/PantallaReducer";
import { useParams, useLocation } from "react-router";
import SwitchMaestro from "./components/SwitchMaestro";
import { AlertasProvider } from "./context/AlertaContext";
import HeaderConf from "./components/HeaderConf";
import { ModalProvider, GestorModales } from "./context/ModalContext";

import Debugger from "./components/Debugger";

const Pantalla = ({ p, i }) => {
  const [state, dispatch] = useReducer(PantallaReducer, initialState);

  let { pantalla } = useParams();
  const { search, state: locationState } = useLocation();

  const [loadingPantalla, setLoadingPantalla] = useState(true);

  const params = new URLSearchParams(search);
  let id = params.get("id");

  useEffect(() => {
    setLoadingPantalla(true);
    axios
      .post(
        farmageo_api + "/pantalla/" + pantalla,
        {
          id: id,
        },
        { params: locationState?.filtros }
      )
      .then((response) => {
        if (response.status >= 400) {
          requestErrorHandler(response);

          return response;
          if (!response.data.error?.continuar) return response;
        }
        dispatch({
          type: "SET_CONFIGURACIONES_REF",
          payload: response.data,
        });
        dispatch({
          type: "SET_CONFIGURACIONES",
          payload: response.data.configuraciones,
        });
        dispatch({
          type: "SET_OPCIONES_DE_PANTALLA",
          payload: response.data.opciones,
        });
        dispatch({
          type: "SET_PANTALLA",
          payload: pantalla,
        });
        dispatch({
          type: "SET_PANTALLA_ID",
          payload: id,
        });

        setLoadingPantalla(false);
        return response;
      })
      .then((response) => {
        dispatch({
          type: "ADD_SQL",
          payload: response.data.sql,
        });
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }, [pantalla, id]);

  //configuraciones opciones orden

  return (
    <PantallaContext.Provider
      value={{
        configuraciones: state.configuraciones,
        opciones_de_pantalla: state.opciones_de_pantalla,
        pantalla: state.pantalla,
        pantalla_id: state.pantalla_id,
        configuraciones_ref: state.configuraciones_ref,
        configuraciones_ids: state.configuraciones_ids,
        filtrosAplicados: state.filtrosAplicados,
        PantallaDispatch: dispatch,
        loadingPantalla,
        sql: state.sql,
      }}
    >
      <AlertasProvider>
        <ModalProvider>
          <FuncionesProvider>
            <Debugger />
            <HeaderConf
              opciones={state.opciones_de_pantalla}
              className="configuracion_pantalla_titulo_principal"
            />
            <div id={pantalla}>
              {loadingPantalla ? (
                <div style={{ width: "100%", textAlign: "center" }}>
                  Cargando...
                </div>
              ) : (
                state.configuraciones
                  .sort((a, b) => a.opciones.orden - b.opciones.orden)
                  .map((item, idx) => (
                    <SwitchMaestro
                      key={item.opciones.id_a}
                      _key={item.id_a}
                      configuracion={item}
                      id={id}
                      idx={idx}
                    />
                  ))
              )}
            </div>
          </FuncionesProvider>
        </ModalProvider>
      </AlertasProvider>
    </PantallaContext.Provider>
  );
};

export default Pantalla;
