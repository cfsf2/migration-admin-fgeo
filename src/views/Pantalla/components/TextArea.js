import React, { useRef, useEffect, useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { v4 as uuidv4 } from "uuid";

const TextArea = ({ value, setValue, onEnter, style }) => {
  const [id, setId] = useState("a" + uuidv4().replace(/-/g, ""));

  const keyUp = useRef(0); // Evita que el evento onBlur se dispare luego de onKeyUp
  const altEnter = useRef(0); // Detecta keyDown = alt + enter
  const setingStart = useRef();

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
    setingStart.current = e.target.selectionStart;

    if (e.key === "Enter") {
      e.preventDefault();
    }
    if (e.key === "Enter" && e.altKey) {
      altEnter.current = 1;

      setValue(
        value.slice(0, setingStart.current) +
          "\n" +
          value.slice(setingStart.current, value.length)
      );
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

  useEffect(() => {
    const ctrl = document.getElementById(id);

    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(setingStart.current + 1, setingStart.current + 1);
    }
  }, [value]);

  return (
    <TextareaAutosize
      id={id}
      value={value}
      onChange={handleInput}
      onKeyUp={handleEnter}
      onBlur={handleOnBlur}
      onKeyDown={handleAlt}
      className="tarjeta_grid_item_input_editable"
      style={style}
    />
  );
};

export default TextArea;
