import React, { useState, useEffect, useContext, useMemo } from "react";

import PantallaContext from "../context/PantallaContext";
import FuncionesContext from "../context/FuncionesContext";

import SwitchMaestro from "../components/SwitchMaestro";

import { Card } from "reactstrap";

const SubPantalla = ({ configuracion, id, nollamar }) => {
  const id_a = configuracion.opciones.id_a;
  const { configuraciones_ref, PantallaDispatch } = useContext(PantallaContext);
  const { getConfiguracion, requestErrorHandler } =
    useContext(FuncionesContext);

  const [loadingPantalla, setLoadingPantalla] = useState(false);

  const [subPantallaConfs, setSubPantallaConfs] = useState(configuracion);

  useEffect(() => {
    if (nollamar) return;

    //useEffect para actualizar datos a control
    if (configuraciones_ref[id_a] === 1) return;

    setLoadingPantalla(true);
    (async () => {
      await getConfiguracion(id_a, id, {})
        .then((response) => {
          if (response.status >= 400) {
            requestErrorHandler(response);
          }
          PantallaDispatch({ type: "SET_DATOS_CONF", payload: configuracion });

          setSubPantallaConfs(response.data);
          setLoadingPantalla(false);
        })

        .catch((error) => {
          console.log(error);
        });
    })();
  }, [configuraciones_ref[id_a]]);

  //configuraciones opciones orden

  const ConfiguracionesComponentes = subPantallaConfs.configuraciones
    .sort((a, b) => a.opciones.orden - b.opciones.orden)
    .map((item) => (
      <SwitchMaestro
        _key={JSON.stringify(item)}
        configuracion={item}
        id={id}
        nollamar={nollamar}
      />
    ));

  return (
    <Card>
      {loadingPantalla ? (
        <div style={{ width: "100%", textAlign: "center" }}>Cargando...</div>
      ) : (
        ConfiguracionesComponentes
      )}
    </Card>
  );
};

export default SubPantalla;
