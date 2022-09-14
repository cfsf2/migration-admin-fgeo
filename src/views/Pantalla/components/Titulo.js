import React from "react";
import "./Pantalla.scss";

const Titulo = (props) => {
  const { titulo, tag, className } = props;

  const Tag = React.createElement(
    tag ? tag : "div",
    { className: className ? className : "" },
    titulo
  );

  return <div className="configuracion_pantalla_titulo">{Tag}</div>;
};

export default Titulo;
