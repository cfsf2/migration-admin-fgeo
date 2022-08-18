import React from "react";
import { lightFormat, parseJSON } from "date-fns";

const FechaC = ({ data, cab, hijos, campokey }) => {
  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();
  return (
    <div className="tarjeta_grid_item_label_item">
      <div className="vista_label" style={{ fontWeight: "bold" }}>
        {nombre}:{" "}
      </div>
      <div
        className="vista_dato"
        style={{
          textAlign: "center",
          marginLeft: "0.2rem",
          marginBottom: "0.3rem",
        }}
      >
        {data[campokey]
          ? lightFormat(
              parseJSON(data[campokey]),
              cab["fecha_formato"] ? cab["fecha_formato"] : "yyyy-MM-dd HH:mm"
            )
          : null}
        {hijos}
      </div>
    </div>
  );
};

export default FechaC;
