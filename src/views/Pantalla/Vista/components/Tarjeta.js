import React, { useContext } from "react";
import VistaContext from "../context/VistaContext";
import SwitchCampos from "./SwitchCampos";
import { Card, CardBody } from "reactstrap";

import "./Tarjeta.scss";
import "./Vista.scss";
import HeaderConf from "../../components/HeaderConf";

const Tarjeta = () => {
  const { datos, cabeceras, opciones, id } = useContext(VistaContext);

  const styles = {
    gridColumn: opciones.grid_span ? opciones.grid_span : "1 / -1",
    border: "none",
    marginBottom: 0,
  };

  const gridTemplatecolumns = () => {
    if (datos.length === 1) return "repeat(12, 1fr)";

    return "repeat(auto-fill, minmax(340px, 1fr)";
  };

  const gridcolumns = () => {
    if (datos.length === 1) return "span 12";
    return undefined;
  };

  return (
    <Card style={styles} id={opciones.id_a} className="animated fadeIn">
      <HeaderConf
        opciones={opciones}
        className="configuracion_pantalla_titulo_secundario"
      />
      <CardBody style={{ padding: 0 }}>
        <div
          className="tarjeta"
          style={{
            gridTemplateColumns: gridTemplatecolumns(),
          }}
        >
          {/* {datos.length === 0
            ? `(No se recuperaron Datos del id especificado) id: ${id}`
            : null} */}

          {datos.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
              }}
              className="tarjeta_grid_item"
            >
              {cabeceras.map((cab, i) => {
                return (
                  <div
                    className="divCampo"
                    style={{
                      gridColumn: cab.grid_span ? cab.grid_span : "1 / -1",
                      display: cab.componente === "null" ? "none" : "inherit",
                    }}
                  >
                    <SwitchCampos
                      data={{ nada: "nada" }}
                      cab={cab}
                      key={cab.id_a + i}
                      indiceData={i}
                      Context={VistaContext}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            datos.map((dato, indiceData) => (
              <div
                style={{
                  gridColumn: gridcolumns(),
                }}
                key={JSON.stringify(dato)}
                className="tarjeta_grid_item"
              >
                {cabeceras
                  .sort((a, b) => a.orden - b.orden)
                  .map((cab, i) => (
                    <div
                      className="divCampo"
                      style={{
                        gridColumn: cab.grid_span ? cab.grid_span : "1 / -1",
                        display:
                          dato[`${cab.id_a}_COMPONENTE`] === "null"
                            ? "none"
                            : "inherit",
                      }}
                    >
                      <SwitchCampos
                        key={cab.id_a + i}
                        indiceData={indiceData}
                        data={dato}
                        cab={cab}
                        Context={VistaContext}
                      />
                    </div>
                  ))}
              </div>
            ))
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Tarjeta;
