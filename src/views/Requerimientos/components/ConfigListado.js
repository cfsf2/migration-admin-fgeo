import React, { useMemo } from "react";
import Listado from "./Listado";

import Select from "../../../components/Select";

const ConfigListado = (props) => {
  const { cabeceras, datos, loading, titulo, filtros, filter, setFilter } =
    props;

  //  if (!loading && cabeceras) {
  let columnas = useMemo(
    () =>
      cabeceras.map((cab) => {
        return {
          title:
            cab.nombre.charAt(0).toUpperCase() +
            cab.nombre.slice(1).replace("_", " "),
          field: cab.nombre,
          cellStyle: cab.style,
          render: (data) => {
            switch (cab.tipo) {
              case "div":
                return (
                  <div className={cab.class} style={{ textAlign: "center" }}>
                    {data[cab.nombre]}
                  </div>
                );
              case "select":
                return (
                  <div style={{ textAlign: "center" }}>
                    <Select
                      nombre={data[cab.nombre]}
                      opciones={cab.opciones}
                      value={data[cab.nombre]}
                      onChange={(e) => cab.onChange(data._id, e.target.value)}
                    />
                  </div>
                );
              case "fecha":
                return (
                  <div style={{ textAlign: "center" }}>
                    {data[cab.nombre].replace("T", " ").replace("Z", " ")}
                  </div>
                );
              default:
                return <></>;
            }
          },
        };
      }),
    [cabeceras]
  );
  //}

  //if (!loading && filtros) {
  let actions = useMemo(
    () =>
      filtros.map((f) => {
        return {
          label: f.nombre,
          campo: f.campo,
          filter: filter,
          setFilter: setFilter,
          opciones: f.opciones,
        };
      }),
    [filtros]
  );
  //}

  return (
    <Listado
      data={datos}
      loading={loading}
      columnas={columnas}
      titulo={titulo}
      filtros={actions}
    />
  );
};

export default ConfigListado;
