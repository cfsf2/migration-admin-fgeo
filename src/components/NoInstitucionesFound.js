import React from "react";
import "./institucionesNoAsociadas.scss";
import MyAlertSVG from "../assets/images/icons/alert.svg";

export default function NoInstitucionesFound() {
  return (
    <div className="institucionesNoAsociadas">
      <h2 className="institucionesNoAsociadas_titulo">ADVERTENCIA</h2>
      <img className="institucionesNoAsociadas_img" src={MyAlertSVG} />
      <p className="institucionesNoAsociadas_texto">
        Su Farmacia no tiene Instituciones Asociadas. <br /> Comuniquese con{" "}
        <a href="mailto:soporte@farmageo.com.ar">soporte@farmageo.com.ar</a>
      </p>
    </div>
  );
}
