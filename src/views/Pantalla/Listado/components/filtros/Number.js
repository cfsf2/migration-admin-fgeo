import React from "react";
import TextField from "@mui/material/TextField";
import Label from "./LabelF";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  numberComponent: {
    "& .MuiInputBase-input": {
      height: "1.4375em",
      padding: "16.5px 14px",
      textAlign: "right",
    },
    "& .css-nnbavb": {
      display: "none",
    },
  },
});

const Number = (props) => {
  const { id, id_a, setFiltrosAAplicar, error, setError } = props;

  const handleInput = (e) => {
    const { value } = e.target;
    setFiltrosAAplicar((prevState) => {
      return { ...prevState, [id_a]: value };
    });
    setError((e) => {
      return { ...e, [id_a]: false };
    });
  };

  const classes = useStyle();

  return (
    <div>
      <Label
        label={props.label}
        opcionales_null={props.opcionales_null}
        permite_null={props.permite_null}
      />
      <TextField
        id={id}
        type="number"
        placeholder={props.placeholder ? props.placeholder : "number"}
        style={{ width: "100%" }}
        onChange={handleInput}
        defaultValue={props.default}
        inputProps={{ style: { textAlign: "right" } }}
        error={error[id_a]}
        className={classes.numberComponent}
      />
    </div>
  );
};

export default Number;
