import React, { useMemo, useContext } from "react";
import Listado from "./Listado";
import { ListadoProvider } from "../Listado";
import SwitchColumnas from "./SwitchColumnas";

import ListadoContext from "../context/ListadoContext";
import { style } from "@mui/system";

const enviarWS = (data, e) => {
  const texto = data.atributos.find((a) => a.codigo === "mensaje_texto").valor;
  window.open(
    "https://api.whatsapp.com/send?phone=+54" +
      data.celular +
      "&text=" +
      eval(texto)
  );
};

const ConfigListado = () => {
  const {
    cabeceras,
    datos,
    loading,
    filtros,
    filtroActivo,
    setFilter,
    opcionesListado,
    opcionesPantalla,
  } = useContext(ListadoContext);

  //  if (!loading && cabeceras) {
  let columnas = useMemo(
    () =>
      cabeceras
        .sort((a, b) => a.orden - b.orden)
        .filter((cab) => cab.componente !== "hidden")
        .filter((cab) => cab.mostrar !== "n")
        .map((cab, i) => {
          return {
            title: cab.nombre,
            field: cab.campo_alias ?? cab.id_a,
            width: cab.width ?? "10%",
            cellStyle: {
              textAlign: cab.align ?? "center",
              // width: cab.width ?? "10%",
            },
            headerStyle: { textAlign: "center" },
            render: (data) => (
              <SwitchColumnas
                data={data}
                cab={cab}
                indiceData={data.tableData.id}
              />
            ),
          };
        }),
    [cabeceras]
  );
  //}

  return (
    <>
      <Listado
        data={datos}
        loading={loading}
        columnas={columnas}
        filtros={filtros}
        setFilter={setFilter}
        filtroActivo={filtroActivo}
      />
    </>
  );
};

export default ConfigListado;
