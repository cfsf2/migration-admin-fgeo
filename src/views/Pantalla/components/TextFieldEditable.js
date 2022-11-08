import React, { useRef, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import "../components/Pantalla.scss";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  miTextField: {
    "& .css-nnbavb": {
      display: "none",
    },
    "& .MuiInputBase-inputMultiline": {
      marginLeft: "5px",
      fontSize: "0.875rem",
    },
    "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
      padding: "4px",
    },
  },
});

const TextFieldEditable = ({ value, setValue, onEnter, maxCaracteres }) => {
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

  const handleOnBlur = (e) => {
    if (keyUp.current !== 0) return;
    return onEnter(e);
  };

  const handleInput = (e) => {
    const valor = e.target.value;
    setValue(valor);
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
      return;
    }
    return;
  };

  useEffect(() => {
    const ctrl = document.getElementById(id);

    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(setingStart.current + 1, setingStart.current + 1);
    }
  }, [value]);

  const classes = useStyles();

  return (
    <TextField
      id={id}
      value={value}
      onChange={handleInput}
      onKeyUp={handleEnter}
      onBlur={handleOnBlur}
      onKeyDown={handleAlt}
      style={{ width: "100%" }}
      inputProps={{ maxLength: maxCaracteres ?? 60 }}
      multiline
      className={classes.miTextField}
    />
  );
};

export default TextFieldEditable;
