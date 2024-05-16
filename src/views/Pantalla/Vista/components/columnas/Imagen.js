import React from "react";
import { image_path_server } from "../../../../../config";

const Imagen = ({ data, cab, hijos, campokey, id_elemento }) => {
  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();

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
        src={imgurl()}
        style={{ textAlign: cab.align, cursor: "pointer" }}
        alt={cab.nombre + " " + campokey}
        width={cab.image_width}
        onClick={() => {
          // Crear un enlace temporal
          const newTab = window.open();
          newTab.document.body.innerHTML = `<img src="${imgurl()}" alt="${
            cab.nombre + " " + campokey
          }" style="width:100%;height:100%;">`;
        }}
      />
      {hijos}
    </div>
  );
};

export default Imagen;
