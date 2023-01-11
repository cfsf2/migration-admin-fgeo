import React from "react";

const SiNo = ({ data, cab, campokey, id_elemento }) => {
  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();

  return (
    <div id={id_elemento} className="tarjeta_grid_item_label_item">
      {nombre ? (
        <div className="vista_label vista_label_fuente">{nombre}:</div>
      ) : (
        <></>
      )}
      <div
        className={`${cab.class} vista_dato`}
        //style={{ textAlign: "center" }}
      >
        {data[campokey] === null ? "" : data[campokey] === "s" ? "SI" : "NO"}
      </div>
    </div>
  );
};

export default SiNo;
