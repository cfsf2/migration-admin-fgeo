import React, { useState, useEffect, useContext, useRef } from "react";

import PantallaContext from "./context/PantallaContext";
import FuncionesContext from "./context/FuncionesContext";
import { v4 as uuidv4 } from "uuid";

import SwitchMaestro from "./components/SwitchMaestro";

const PantallaModal = ({ pantalla: id_a, id }) => {
  const { configuraciones_ref, PantallaDispatch } = useContext(PantallaContext);
  const { getConfiguracion, requestErrorHandler } =
    useContext(FuncionesContext);

  console.log("Pantalla Modal", id_a, id);

  useEffect(() => {
    //useEffect para actualizar datos a control
    if (configuraciones_ref[id_a] === 1) return;

    (async () => {
      await getConfiguracion(id_a, id, {})
        .then((response) => {
          if (response.status >= 400) {
            requestErrorHandler(response);
          }
          // PantallaDispatch({
          //   type: "SET_DATOS_CONF",
          //   payload: { configuracion: response.data, idx: uuidv4() },
          // });

          // PantallaDispatch({
          //   type: "ADD_SQL",
          //   payload: response.data.sql,
          // });
        })

        .catch((error) => {
          console.log(error);
        });
    })();
  }, [configuraciones_ref[id_a]]);

  return <></>;
};

export default PantallaModal;
