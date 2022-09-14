import React from "react";
import { Button } from "@material-ui/core";

import "./botonera.scss";

const Cancelar = ({ handleCancelar }) => {
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        onClick={handleCancelar}
        style={{ width: "100px", marginRight: "20px" }}
      >
        Cancelar
      </Button>
    </>
  );
};

export default Cancelar;
