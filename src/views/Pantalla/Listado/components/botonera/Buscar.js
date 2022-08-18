import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import ListadoContext from "../../context/ListadoContext";
import "../../botonera.scss";

const Buscar = ({ handleSubmit, loading }) => {
  const { filtroActivo } = useContext(ListadoContext);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: "100px", marginRight: "20px" }}
      >
        Buscar
      </Button>
    </>
  );
};

export default Buscar;
