import React from "react";
import { lightFormat, parseJSON } from "date-fns";

const FechaC = ({ data, cab, hijos, campokey }) => {
  return (
    <div style={{ textAlign: "center" }}>
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
