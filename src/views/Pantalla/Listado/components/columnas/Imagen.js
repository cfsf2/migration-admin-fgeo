import React from "react";
import { image_path_server } from "../../../../../config";

const Imagen = ({ data, cab, hijos, campokey, indiceData }) => {
  const id = JSON.stringify(data) + JSON.stringify(cab) + indiceData;

  return (
    <div id={id} style={{ width: "100%", textAlign: "center" }}>
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
