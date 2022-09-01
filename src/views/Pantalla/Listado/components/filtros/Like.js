import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Label from "./LabelF";

const Like = (props) => {
  const {
    id,
    id_a,
    orden,
    label,
    filtrosAAplicar,
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
        type="text"
        placeholder={props.placeholder}
        style={{ width: "100%" }}
        onChange={handleInput}
        defaultValue={props.default}
        label={label}
        value={filtrosAAplicar[id_a] ? filtrosAAplicar[id_a] : ""}
        error={error[id_a]}
      />
    </div>
  );
};
export default Like;
