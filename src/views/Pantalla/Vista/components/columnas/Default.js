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
        textAlign: cab.align,
        width: "100%",
        borderColor: "green",
      };
    }
    return {
      borderColor: "grey",
    };
  })();

  const classNames = data[cab.id_a + "_className"] ?? cab.className;

  return (
    <>
      <div id={id_elemento} className="tarjeta_grid_item_label_item">
        {nombre ? (
          <div className="vista_label vista_label_fuente">{nombre}:</div>
        ) : (
          <></>
        )}
        <div className={classNames} style={style}>
          <div>{data[campokey]}</div>
        </div>
      </div>
      {hijos?.map((hijo) => hijo)}
    </>
  );
};

export default Default;
