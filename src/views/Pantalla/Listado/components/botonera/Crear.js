import React from "react";
import { Button } from "@material-ui/core";
import "../../botonera.scss";

const Crear = () => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        style={{ width: "100px", marginRight: "20px" }}
      >
        Crear
      </Button>
    </>
  );
};

export default Crear;
