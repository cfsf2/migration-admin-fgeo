import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const Imprimir = ({ opciones }) => {
  const handleClick = () => {
    window.print();
  };

  return (
    <div
      className={
        opciones.titulo
          ? "flex_acciones_vista_imprimir"
          : "flex_acciones_vista_alt_imprimir"
      }
    >
      <a onClick={handleClick} style={{ cursor: "pointer" }} title="Imprimir">
        <FontAwesomeIcon icon={faPrint} />
      </a>
    </div>
  );
};

export default Imprimir;
