import React from "react";
import { lightFormat, parseJSON } from "date-fns";

const FechaC = ({ data, cab, hijos, campokey, indiceData }) => {
  const id = JSON.stringify(data) + JSON.stringify(cab) + indiceData;

  return (
    <div id={id} style={{ textAlign: "center" }}>
      {data[campokey]
        ? lightFormat(
            parseJSON(data[campokey]),
            cab["fecha_formato"] ? cab["fecha_formato"] : "yyyy-MM-dd HH:mm"
          )
        : null}
      {hijos}
    </div>
  );
};

export default FechaC;
