import React from "react";

const Default = ({ data, cab, hijos, campokey }) => {
  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();

  const style = (() => {
    if (data[campokey]) {
      return {
        borderColor: "green",
      };
    }
    return {
      borderColor: "grey",
    };
  })();

  return (
    <>
      <div className="tarjeta_grid_item_label_item">
          <div
            className="vista_label"
            style={{ fontWeight: "bold", wordBreak: "break-all" }}
          >
            {nombre}:
          </div>
          <div
            className={`${cab.class} vista_dato`}
            style={{ textAlign: "center", display: "flex" }}
          >
            <div style={style}>{data[campokey]}</div>
          </div>
        </div>
      {hijos?.map((hijo) => hijo)}
    </>
  );
};

export default Default;
