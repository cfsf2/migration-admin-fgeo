import React, { useMemo, useContext, useCallback } from "react";
import Listado from "./Listado";

import ListadoContext from "../context/ListadoContext";

const enviarWS = (data, e) => {
  const texto = data.atributos.find((a) => a.codigo === "mensaje_texto").valor;
  window.open(
    "https://api.whatsapp.com/send?phone=+54" +
      data.celular +
      "&text=" +
      eval(texto)
  );
};

const ConfigListado = (props) => {
  const { cabeceras, datos, loading, filtros, filtroActivo, setFilter } =
    useContext(ListadoContext);

  //  if (!loading && cabeceras) {
  let columnas = cabeceras
    .sort((a, b) => a.orden - b.orden)
    .filter((cab) => cab.componente !== "hidden")
    .filter((cab) => cab.componente !== "null")
    .filter((cab) => cab.mostrar !== "n")
    .map((cab, i) => {
      //console.log("cab:  ", cab);

      return {
        title: cab.nombre_alias ? datos[0][cab.nombre_alias] : cab.nombre,
        field: cab.campo_alias ?? cab.id_a,
        width: cab.width ?? "10%",
        totalizar: cab.totalizar ?? undefined,
        cellStyle: {
          textAlign: cab.align ?? "center",
          // width: cab.width ?? "10%",
          padding: "0em 16px",
          fontSize: "0.8em",
          lineHeight: 1,
        },
        id: cab.id_a,
        headerStyle: {
          textAlign: "left",
          fontSize: "0.9em",
          padding: "0.1em 16px",
          height: "0.8em",
        },
        // render: (data) => {
        //   return (
        //     <SwitchColumnas
        //       data={data}
        //       cab={cab}
        //       indiceData={data.tableData.id}
        //       Context={ListadoContext}
        //       id_elemento={cab.id_a + data.tableData.id}
        //     />
        //   );
        // },
      };
    });

  //}

  let tots = { TOTALES: 1 };
  const p = columnas
    .map((column) => {
      if (column.totalizar === "s") {
        tots[column.field + "_COMPONENTE"] = "columna_simple";
        tots[column.field] = datos.reduce((agg, row) => {
          if (row.TOTALES === 1) return agg;
          return agg + row[column.field];
        }, 0);
        return tots[column.field];
      }
      return undefined;
    })
    .filter((c) => c);

  const dataContTotales = p.length > 0 ? datos : datos;

  return (
    <>
      <Listado
        data={dataContTotales}
        loading={loading}
        columnas={cabeceras}
        filtros={filtros}
        setFilter={setFilter}
        filtroActivo={filtroActivo}
        tots={tots}
      />
    </>
  );
};

export default ConfigListado;
