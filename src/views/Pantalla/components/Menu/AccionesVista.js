import React from "react";
import Imprimir from "./Imprimir";
import Email from "./Email";
import Historial from "./Historial";
import Excel from "./Excel";
import Configuracion from "./Configuracion";

const AccionesVista = ({ opciones }) => {
  return (
    <div id={opciones.id_a + "_menu_vista"}>
      <div className="flex_acciones_vista">
        {opciones.imprimir_activo === "s" ? (
          <Imprimir opciones={opciones} />
        ) : (
          <></>
        )}
        {opciones.email_activo === "s" ? <Email /> : <></>}
        {opciones.historial_activo === "s" ? <Historial /> : <></>}
        {opciones.excel_activo === "s" ? <Excel /> : <></>}
        {opciones.configuracion_usuario_activo === "s" ? (
          <Configuracion />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AccionesVista;
