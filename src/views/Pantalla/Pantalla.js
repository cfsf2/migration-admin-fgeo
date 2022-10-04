import React, { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";

import { farmageo_api } from "../../config";

import PantallaContext from "./context/PantallaContext";
import { requestErrorHandler } from "./context/FuncionesContext";
import { FuncionesProvider } from "./context/FuncionesContext";
import PantallaReducer, { initialState } from "./context/PantallaReducer";
import { useParams, useLocation } from "react-router";
import SwitchMaestro from "./components/SwitchMaestro";
import { AlertasProvider } from "./context/AlertaContext";
import HeaderConf from "./components/HeaderConf";

const Pantalla = () => {
  const [state, dispatch] = useReducer(PantallaReducer, initialState);

  const { pantalla } = useParams();
  const { search, state: locationState } = useLocation();

  const [loadingPantalla, setLoadingPantalla] = useState(true);

  const params = new URLSearchParams(search);
  const id = params.get("id");

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
          if (!response.data.error?.continuar) return;
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
      })

      .catch((error) => {
        console.log(error);
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
        filtrosAplicados: state.filtrosAplicados,
        PantallaDispatch: dispatch,
        loadingPantalla,
      }}
    >
      <AlertasProvider>
        <FuncionesProvider>
          <HeaderConf
            opciones={state.opciones_de_pantalla}
            className="configuracion_pantalla_titulo_principal"
          />
          {loadingPantalla ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              Cargando...
            </div>
          ) : (
            state.configuraciones
              .sort((a, b) => a.opciones.orden - b.opciones.orden)
              .map((item) => (
                <SwitchMaestro key={item.id_a} configuracion={item} id={id} />
              ))
          )}
        </FuncionesProvider>
      </AlertasProvider>
    </PantallaContext.Provider>
  );
};

export default Pantalla;
