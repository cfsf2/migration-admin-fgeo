import React from "react";
import { TextField } from "@mui/material";
import Label from "./LabelF";

const InputText = ({
  setValor,
  valor,
  cab,
  error,
  setError,
  data,
  number,
  textarea,
}) => {
  const { id, id_a, label, grid_span, margin_bottom_abm, width } = cab;

  const handleInput = (e) => {
    let { value } = e.target;

    if (cab.solo_mayus === "s") {
      value = value.toUpperCase();
    }
    setValor(value);
    setError((e) => {
      return { ...e, [id_a]: false };
    });
  };

  const styles = {
    gridColumn: grid_span,
  };

  const style_input_abm = {
    width: width,
    marginBottom: margin_bottom_abm,
  };

  return (
    <div style={styles}>
      <Label
        label={cab.label}
        opcionales_null={cab.opcionales_null}
        permite_null={cab.permite_null}
      />
      <TextField
        id={id}
        type={number ? "number" : "text"}
        placeholder={cab.placeholder}
        onChange={handleInput}
        defaultValue={data[id_a]}
        label={label}
        value={valor ? valor : ""}
        error={error[id_a]}
        multiline={textarea}
        maxRows={500}
        minRows={2}
        InputProps={{
          style: {
            textTransform: cab.solo_mayus === "s" ? "uppercase" : "inherit",
          },
        }}
        style={style_input_abm}
      />
    </div>
  );
};
export default InputText;
