import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@mui/material";
import React from "react";
import Label from "./LabelF";

const CheckboxF = (props) => {
  const {
    label,
    textAlign,
    width,
    margin,
    padding,
    filtrosAAplicar,
    setFiltrosAAplicar,
    id_a,
    grid_span,
  } = props;

  const onChange = (e) => {
    setFiltrosAAplicar((prevState) => {
      if (!e.target.checked) {
        const newState = { ...prevState };
        delete newState[id_a];
        return newState;
      }
      return {
        ...prevState,
        [id_a]: "s",
      };
    });
  };

  const styles = {
    textAlign,
    width,
    margin,
    padding,
    gridColumn: grid_span,
  };

  return (
    <div style={styles}>
      <Label
        label={props.label}
        opcionales_null={props.opcionales_null}
        permite_null={props.permite_null}
      />
      <FormControlLabel
        control={
          <Checkbox
            onChange={onChange}
            checked={filtrosAAplicar[id_a] ? filtrosAAplicar[id_a] : false}
          />
        }
        label={label}
        //style={{ marginLeft: "0px" }}
      />
    </div>
  );
};

export default CheckboxF;
