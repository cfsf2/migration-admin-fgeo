import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const Excel = ({ opciones }) => {
  const [motrarExcel, setMotrarExcel] = useState(false);

  const handleClick = () => {
    setMotrarExcel(true);
    window.alert("tremendo excel...");
  };
  return (
    <div
      className={
        opciones.titulo
          ? "flex_acciones_vista_excel"
          : "flex_acciones_vista_alt_excel"
      }
    >
      <a
        onClick={handleClick}
        style={{ cursor: "pointer" }}
        title="Descargar Excel"
      >
        <FontAwesomeIcon icon={faFileArrowDown} />
      </a>
    </div>
  );
};

export default Excel;
