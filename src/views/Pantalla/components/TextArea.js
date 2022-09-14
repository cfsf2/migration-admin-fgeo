import React, { useRef } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const TextArea = ({ value, setValue, onEnter, style }) => {
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

  const handleOnBlur = (e) => {
    if (keyUp.current !== 0) return;
    return onEnter(e);
  };

  const handleInput = (e) => {
    const valor = e.target.value;
    setValue(valor);
  };

  return (
    <TextareaAutosize
      onChange={handleInput}
      onKeyUp={handleEnter}
      onKeyDown={handleAlt}
      onBlur={handleOnBlur}
      value={value}
      className="tarjeta_grid_item_input_editable"
      style={(style)} 
    />
  );
};

export default TextArea;
