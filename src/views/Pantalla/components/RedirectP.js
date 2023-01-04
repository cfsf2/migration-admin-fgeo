import React from "react";
import { Redirect } from "react-router";

const RedirectP = ({ configuracion }) => {
  const { enlace, enlace_externo } = configuracion.opciones;

  if (enlace_externo === "s") {
    return window.location.replace(enlace);
  }

  return (
    <Redirect
      to={{
        pathname: enlace,
      }}
    />
  );
};

export default RedirectP;
