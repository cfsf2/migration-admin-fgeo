import React, { useState } from "react";
import { TextField } from "@mui/material";
import Label from "./LabelF";

const InputText = ({ setValor, valor, cab, error, setError, data }) => {
  const { id, id_a, margin_bottom_abm, pass_minimo } = cab;

  const handleInput = (e) => {
    let { value } = e.target;

    setValor(value);

    if (pass_minimo) {
      if (value.length < pass_minimo) {
        return setError((e) => {
          return { ...e, [id_a]: true };
        });
      }
    }

    setError((e) => {
      return { ...e, [id_a]: false };
    });
  };

  const style_input_abm = {
    width: "100%",
    marginBottom: margin_bottom_abm,
  };

  return (
    <>
      {cab.label ? (
        <Label
          label={cab.label}
          opcionales_null={cab.opcionales_null}
          permite_null={cab.permite_null}
        />
      ) : (
        <></>
      )}
      <TextField
        id={id}
        type="password"
        placeholder={cab.placeholder}
        onChange={handleInput}
        defaultValue={data[id_a]}
        label={cab.nombre}
        value={valor ? valor : ""}
        error={error[id_a]}
        helperText={
          error[id_a] ? (
            <p>
              La contraseña debe tener {pass_minimo} caracteres mínimo &#9940;
            </p>
          ) : (
            ""
          )
        }
        style={style_input_abm}
      />
    </>
  );
};
export default InputText;
