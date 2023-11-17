import React from "react";
import { image_path_server } from "../../../../../config";

const Imagen = ({ data, cab, hijos, campokey, id_elemento }) => {
  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();
  const classNames = data[cab.id_a + "_className"] ?? cab.className;
  return (
    <div
      id={id_elemento}
      style={{ width: "100%", textAlign: cab.align }}
      className={classNames}
    >
      {nombre ? (
        <div className="vista_label" style={{ fontWeight: "bold" }}>
          {nombre}:
        </div>
      ) : (
        <></>
      )}
      <img
        src={image_path_server + data[campokey]}
        style={{ textAlign: cab.align }}
        alt={cab.nombre + " " + campokey}
        width={cab.image_width}
      />
      {hijos}
    </div>
  );
};

export default Imagen;
