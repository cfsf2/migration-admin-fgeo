import React, { useState } from "react";
import { TextField } from "@mui/material";
import { ca } from "date-fns/locale";

const InputText = ({ data, cab, campokey }) => {
  const [valor, setValor] = useState("");

  const handleInput = (e) => {
    const { value } = e.target;
    setValor(value);
  };

  return (
    <>
      <TextField
        type={cab.input_number === "s" ? "number" : "text"  }
        placeholder={cab.placeholder}
        onChange={handleInput}
        className=""
      />
    </>
  );
};

export default InputText;
