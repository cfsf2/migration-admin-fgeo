import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@mui/material";
import React from "react";
import Label from "./LabelF";

const InputCheckbox = ({ setValor, valor, cab, error, setError, data }) => {
  const {
    label,
    textAlign,
    width,
    margin,
    padding,
    // filtrosAAplicar,
    // setFiltrosAAplicar,
    opcionales_null,
    permite_null,
    id_a,
    grid_span,
  } = cab;

  const onChange = (e) => {
    if (!e.target.checked) {
      return setValor(undefined);
    }
    return setValor("s");
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
        label={label}
        opcionales_null={opcionales_null}
        permite_null={permite_null}
      />
      <FormControlLabel
        control={
          <Checkbox onChange={onChange} checked={valor ? valor : false} />
        }
        label={label}
        style={{ marginLeft: "0px" }}
      />
    </div>
  );
};

export default InputCheckbox;
