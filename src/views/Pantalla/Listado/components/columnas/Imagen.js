import React from "react";
import { image_path_server } from "../../../../../config";

const Imagen = ({ data, cab, hijos, campokey, indiceData, id_elemento }) => {
  const classNames = data[cab.id_a + "_className"] ?? cab.className;

  const imgurl = () => {
    if (!data[campokey]) return null;
    if (cab.imagen_local === "s") {
      return "/" + data[campokey].replace(/\.\.\//g, "");
    }
    if (cab.imagen_ruta_completa === "s") {
      return data[campokey];
    }
    return image_path_server + data[campokey];
  };

  return (
    <div
      id={id_elemento}
      style={{ width: "100%", textAlign: "center" }}
      className={classNames}
    >
      {imgurl() ? (
        <img
          src={imgurl()}
          style={{ textAlign: "center" }}
          alt={cab.nombre + " " + campokey}
          width={cab.image_width}
        />
      ) : (
        <></>
      )}
      {hijos}
    </div>
  );
};

export default Imagen;
