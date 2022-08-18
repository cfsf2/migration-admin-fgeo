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
    gridColumn: opciones.grid_span,
  };

  return (
    <Card id={opciones.id_a} className="animated fadeIn">
      <HeaderConf
        opciones={opciones}
        className="configuracion_pantalla_titulo_secundario"
      />
      <CardBody>
        <div className="tarjeta">
          {datos.length === 0
            ? `(No se recuperaron Datos del id especificado) id: ${id}`
            : null}
          {datos.length === 0
            ? cabeceras.map((cab) => <SwitchCampos data={{}} cab={cab} />)
            : datos.map((dato, indiceData) => (
                <div
                  key={JSON.stringify(dato)}
                  style={styles}
                  className="tarjeta_grid_item"
                >
                  {cabeceras
                    .sort((a, b) => a.orden - b.orden)
                    .map((cab, i) => (
                      <SwitchCampos
                        key={cab.id_a + i}
                        indiceData={indiceData}
                        data={dato}
                        cab={cab}
                      />
                    ))}
                </div>
              ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Tarjeta;
