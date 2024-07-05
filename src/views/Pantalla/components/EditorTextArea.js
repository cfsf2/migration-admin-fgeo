import React from "react";
import { Editor } from "primereact/editor";

export const ReadOnlyTextArea = ({
  data,
  cab,
  hijos,
  campokey,
  indiceData,
  type,
  context,
  id_elemento,
  valor,
}) => {
  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();

  let classNames = data[cab.id_a + "_className"] ?? cab.className;
  return (
    <div
      style={{ width: "100%" }}
      id={id_elemento}
      className="tarjeta_grid_item_label_item d-flex flex-column align-items-start"
    >
      {nombre ? <div className="vista_label">{nombre}:</div> : <></>}{" "}
      <Editor
        className={classNames}
        style={{ border: "1px solid #fff0", width: "100%" }}
        id={id_elemento}
        value={valor ?? data[campokey]}
        disabled
        readOnly
        pt={{
          toolbar: {
            className: "d-none",
            style: { width: "100%" },
          },
          content: {
            style: { width: "100%" },
          },
        }}
      />{" "}
    </div>
  );
};
