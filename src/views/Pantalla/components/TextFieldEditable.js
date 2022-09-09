import React, { useRef } from "react";
import { TextField } from "@mui/material";
import "../components/Pantalla.scss";

const TextFieldEditable = ({ value, setValue, onEnter }) => {
  const keyUp = useRef(0); // Evita que el evento onBlur se dispare luego de onKeyUp
  const altEnter = useRef(0); // Detecta keyDown = alt + enter

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (altEnter.current !== 0) return;

      keyUp.current = 1;
      e.target.blur();

      return onEnter(e).then(() => {
        keyUp.current = 0;
      });
    }
    return (altEnter.current = 0);
  };

  const handleOnBlur = (e) => {
    if (keyUp.current !== 0) return;
    return onEnter(e);
  };

  const handleInput = (e) => {
    const valor = e.target.value;
    setValue(valor);
  };

  const handleAlt = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
    if (e.key === "Enter" && e.altKey) {
      altEnter.current = 1;

      setValue(value + "\n");
    }
    return;
  };

  return (
    <TextField
      value={value}
      onChange={handleInput}
      onKeyUp={handleEnter}
      onBlur={handleOnBlur}
      onKeyDown={handleAlt}
      style={{ width: "100%" }}
      inputProps={{ maxLength: 60 }}
      multiline
      className="css-nnbavb"
    />
  );
};

export default TextFieldEditable;
