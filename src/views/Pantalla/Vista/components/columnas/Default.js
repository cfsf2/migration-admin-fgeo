import React from "react";

const Default = ({ data, cab, hijos, campokey, id_elemento }) => {
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
      <div id={id_elemento} className="tarjeta_grid_item_label_item">
        {nombre ? (
          <div className="vista_label vista_label_fuente">{nombre}:</div>
        ) : (
          <></>
        )}
        <div
          className={data[cab.id_a + "_className"]}
          // style={{ position: "relative", left: "-13px" }}
        >
          <div style={style}>{data[campokey]}</div>
        </div>
      </div>
      {hijos?.map((hijo) => hijo)}
    </>
  );
};

export default Default;
