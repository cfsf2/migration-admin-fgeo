import React, { useMemo } from "react";
import Listado from "./Listado";
import { Button } from "reactstrap";
import Select from "../../../components/Select";
import icono_ws from "../../../assets/images/icono_ws.svg";

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
              case "button":
                return (
                  <div style={{ textAlign: "center" }}>
                    <img
                      style={{ cursor: "pointer" }}
                      height={"40px"}
                      src={cab.imagen}
                      onClick={(e) => {
                        return eval(cab.onClick)(data, e);
                      }}
                    />
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
