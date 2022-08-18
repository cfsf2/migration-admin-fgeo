import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const Imprimir = () => {
  const handleClick = () => {
    window.print();
  };

  return (
    <div className="flex_acciones_vista_imprimir">
      <a onClick={handleClick} style={{ cursor: "pointer" }} title="Imprimir">
        <FontAwesomeIcon icon={faPrint} />
      </a>
    </div>
  );
};

export default Imprimir;
