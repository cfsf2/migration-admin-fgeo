import React, { useState } from "react";
import { TextField } from "@mui/material";

const InputText = ({ data, cab, campokey, id_elemento }) => {
  const [valor, setValor] = useState("");

  const handleInput = (e) => {
    const { value } = e.target;
    setValor(value);
  };

  return (
    <>
      <TextField
        id={id_elemento}
        type={cab.input_number === "s" ? "number" : "text"}
        placeholder={cab.placeholder}
        onChange={handleInput}
        className=""
        inputProps={{
          maxLength:
            cab.maximo_caracteres !== "" ? parseInt(cab.maximo_caracteres) : 60,
        }}
      />
    </>
  );
};

export default InputText;
