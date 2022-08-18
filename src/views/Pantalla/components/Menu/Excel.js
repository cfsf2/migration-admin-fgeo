import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const Excel = () => {
  const [motrarExcel, setMotrarExcel] = useState(false);

  const handleClick = () => {
    setMotrarExcel(true);
    window.alert("tremendo excel...");
  };
  return (
    <div className="flex_acciones_vista_excel">
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
