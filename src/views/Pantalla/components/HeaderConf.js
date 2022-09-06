import React from "react";
import Titulo from "./Titulo";
import AccionesVista from "./Menu/AccionesVista";
import { CardTitle } from "reactstrap";

const HeaderConf = ({ opciones, className }) => {
  return (
    <CardTitle className="tarjeta_titulo" style={{ position: "relative" }}>
      {opciones.titulo ? (
        <>
          <Titulo
            tag={opciones.titulo_tag}
            titulo={opciones.titulo}
            className={className}
          />
          <AccionesVista opciones={opciones} />
        </>
      ) : null}
    </CardTitle>
  );
};

export default HeaderConf;
