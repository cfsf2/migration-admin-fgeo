import React, { useContext } from "react";
import FuncionesContext from "../../../context/FuncionesContext";

const Boton = ({
  data,
  cab,
  hijos,
  campokey,
  indiceData,
  id_elemento,
  context = {},
}) => {
  const f = useContext(FuncionesContext);
  const { datos_seleccionados, datos, sideData } = useContext(context);

  const {
    boton_cursor = "pointer",
    boton_image_height = "40px",
    boton_image_alt = "imagen",
    boton_texto = "Click Aqui",
    boton_texto_alias,
  } = cab;

  const botonStyle = {
    cursor: boton_cursor,
  };

  const handleCancelar = () => console.log("Cancelado");

  const handleClick = () => {
    let funcion = "";

    if (cab.boton_funcion_onClick) {
      funcion = cab.boton_funcion_onClick;
    }
    if (cab.boton_funcion_alias) {
      funcion = data[cab.boton_funcion_onClick_alias];
    }

    if (data[cab.id_a + "_boton_funcion_onClick"]) {
      funcion = data[cab.id_a + "_boton_funcion_onClick"];
    }

    if (datos_seleccionados && cab.listado_seleccion_data) {
      const columnas = cab.listado_seleccion_data.split("|");

      const index_seleccionados = datos_seleccionados.map(
        (d) => d.tableData.index
      );

      const datos_actuales = datos.filter((d, i) =>
        index_seleccionados.includes(i)
      );

      const dataS = datos_actuales.map((r) => {
        let dataArray = [];
        columnas.forEach((c) => dataArray.push(r[c]));

        return dataArray;
      });

      return f[funcion]({ data: dataS, cab, handleCancelar, sideData });
    }

    f[funcion]({ data, cab, indiceData, handleCancelar });
    return;
  };

  return (
    <div
      id={id_elemento}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={botonStyle} onClick={handleClick}
      className={`${cab.className} btn-eliminar `}>
        {cab.imagen_url ? (
          <img
            style={{ cursor: "pointer" }}
            height={boton_image_height}
            src={cab.imagen_url}
            alt={boton_image_alt}
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            {boton_texto_alias ? data[boton_texto_alias] : boton_texto}
          </div>
        )}
        {hijos}
      </div>
    </div>
  );
};

export default Boton;
