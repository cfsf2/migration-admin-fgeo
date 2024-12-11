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
  const { id, id_a, label, margin_bottom_abm, width, maximo_caracteres } = cab;

  const handleInput = (e) => {
    let { value } = e.target;

    // Validar máximo de caracteres
    if (maximo_caracteres && value.length > maximo_caracteres) {
      setError((e) => ({
        ...e,
        [id_a]: true, // Marca el campo con error
      }));
      return; // No actualiza el valor si excede
    }

    if (cab.solo_mayus === "s") {
      value = value.toUpperCase();
    }

    setValor(value);

    setError((e) => ({
      ...e,
      [id_a]: false,
    }));
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
        type={cab.input_type ?? (number ? "number" : "text")}
        placeholder={cab.placeholder}
        onChange={handleInput}
        defaultValue={data[id_a]}
        label={cab.nombre}
        value={valor ? valor : ""}
        error={error[id_a]} // El error se muestra visualmente
        helperText={
          error[id_a]
            ? `Máximo ${maximo_caracteres} caracteres permitidos`
            : ""
        } // Mensaje de error
        multiline={textarea}
        maxRows={500}
        minRows={2}
        inputProps={{
          style: {
            textTransform: cab.solo_mayus === "s" ? "uppercase" : "inherit",
          },
          maxLength: maximo_caracteres, // Para limitar caracteres en el navegador
        }}
        style={style_input_abm}
      />
    </>
  );
};

export default InputText;
