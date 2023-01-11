import React from "react";
import { image_path_server } from "../../../../../config";

const Imagen = ({ data, cab, hijos, campokey, indiceData,id_elemento }) => {

  return (
    <div id={id_elemento} style={{ width: "100%", textAlign: "center" }}>
      <img
        src={image_path_server + data[campokey]}
        style={{ textAlign: "center" }}
        alt={cab.nombre + " " + campokey}
        width={cab.image_width}
      />
      {hijos}
    </div>
  );
};

export default Imagen;
