import React, { useContext } from "react";
import FuncionesContext from "../../../context/FuncionesContext";

const Boton = ({ data, cab, hijos, campokey, indiceData, id_elemento }) => {
  const f = useContext(FuncionesContext);

  const {
    boton_padding = "0.2rem 0.5rem",
    boton_backgroundColor = "rgba(212, 215, 217, 1)",
    boton_textAlign = "center",
    boton_cursor = "pointer",
    boton_width = "100px",
    boton_borderRadius = "15px",
    boton_image_height = "40px",
    boton_image_alt = "imagen",
    boton_texto = "Click Aqui",
    boton_color = "black",
    boton_texto_alias,
  } = cab;

  const botonStyle = {
    padding: boton_padding,
    backgroundColor: boton_backgroundColor,
    textAlign: boton_textAlign,
    cursor: boton_cursor,
    width: boton_width,
    borderRadius: boton_borderRadius,
    color: boton_color,
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

    f[funcion]({ data, cab, indiceData, handleCancelar });
    return;
  };

  const classNames = data[cab.id_a + "_className"] ?? cab.className;

  return (
    <div id={id_elemento} style={{ width: "100%" }} className={classNames}>
      <div style={botonStyle} onClick={handleClick}>
        {cab.imagen_url ? (
          <img
            style={{ cursor: "pointer" }}
            height={boton_image_height}
            src={cab.imagen_url}
            alt={boton_image_alt}
          />
        ) : (
          <div style={{ textAlign: "center", fontSize: "0.875rem" }}>
            {boton_texto_alias ? data[boton_texto_alias] : boton_texto}
          </div>
        )}
        {hijos}
      </div>
    </div>
  );
};

export default Boton;
