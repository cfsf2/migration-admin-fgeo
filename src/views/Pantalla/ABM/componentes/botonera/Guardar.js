import React from "react";
import { Button } from "@material-ui/core";

import "./botonera.scss";

const Guardar = ({ handleSubmit, loading, id }) => {
  return (
    <>
      <Button
        variant="contained"
        color={id ? "primary" : "secondary"}
        size="medium"
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: "100px", marginRight: "20px" }}
      >
        {id ? "Guardar" : "Crear"}
      </Button>
    </>
  );
};

export default Guardar;
