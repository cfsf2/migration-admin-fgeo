import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

import "./botonera.scss";

const Guardar = ({
  handleSubmit,
  loading,
  id,
  texto_confirmar,
  submitOnEnter = true,
  buttonId = "abm_boton_guardar",
}) => {
  useEffect(() => {
    if (!submitOnEnter) return;
    document.addEventListener("keydown", (e) => {
      if (e.key && e.key.toLocaleLowerCase() === "enter") {
        document.getElementById(buttonId).click();
      }
    });
  }, [buttonId, submitOnEnter]);

  return (
    <>
      <Button
        id={buttonId}
        variant="contained"
        color={id ? "primary" : "secondary"}
        size="medium"
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: "100px", marginRight: "20px" }}
      >
        {texto_confirmar ?? (id ? "Guardar" : "Crear")}
      </Button>
    </>
  );
};

export default Guardar;
