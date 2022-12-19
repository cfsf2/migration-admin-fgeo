import React from "react";
import { TextField } from "@mui/material";
import Label from "./LabelF";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  likeComponent: {
    "& .MuiInputBase-input": {
      height: "1.4375em",
      padding: "13px 14px",
    },
    "& .css-nnbavb": {
      display: "none",
    },
  },
});

const Like = (props) => {
  const {
    id,
    id_a,
    label,
    filtrosAAplicar,
    setFiltrosAAplicar,
    error,
    setError,
  } = props;

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
        type="text"
        placeholder={props.placeholder}
        style={{ width: "100%", marginTop: "6.1px" }}
        onChange={handleInput}
        defaultValue={props.default}
        label={label}
        value={filtrosAAplicar[id_a] ? filtrosAAplicar[id_a] : ""}
        error={error[id_a]}
        className={classes.likeComponent}
      />
    </div>
  );
};
export default Like;
