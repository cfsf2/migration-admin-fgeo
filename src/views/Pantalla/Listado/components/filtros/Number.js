import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Label from "./LabelF";

const Number = (props) => {
  const {
    id,
    id_a,
    orden,
    label,
    campo,
    filtroActivo,
    setFiltrosAAplicar,
    grid_span,
    error,
    setError,
  } = props;

  const handleInput = (e) => {
    const { value } = e.target;
    setFiltrosAAplicar((prevState) => {
      return { ...prevState, [id_a]: value };
    });
    setError((e) => {
      return { ...e, [id_a]: false };
    });
  };

  return (
    <div>
      <Label
        label={props.label}
        opcionales_null={props.opcionales_null}
        permite_null={props.permite_null}
      />
      <TextField
        id={id}
        type="number"
        placeholder={props.placeholder ? props.placeholder : "number"}
        style={{ width: "100%" }}
        onChange={handleInput}
        defaultValue={props.default}
        inputProps={{ style: { textAlign: "right" } }}
        error={error[id_a]}
      />
    </div>
  );
};

export default Number;
