import React from "react";
import { image_path_server } from "../../../../../config";

const Imagen = ({ data, cab, hijos, campokey, indiceData, id_elemento }) => {
  const classNames = data[cab.id_a + "_className"] ?? cab.className;
  if (cab.imagen_local === "s") {
    const imgurl = "/" + data[campokey].replace(/\.\.\//g, "");
    console.log(imgurl);
    return (
      <div
        id={id_elemento}
        style={{ width: "100%", textAlign: "center" }}
        className={classNames}
      >
        <img
          src={imgurl}
          style={{ textAlign: "center" }}
          alt={cab.nombre + " " + campokey}
          width={cab.image_width}
        />
        {hijos}
      </div>
    );
  }
  return (
    <div
      id={id_elemento}
      style={{ width: "100%", textAlign: "center" }}
      className={classNames}
    >
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
