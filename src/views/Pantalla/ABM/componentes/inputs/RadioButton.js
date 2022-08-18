import React from "react";
import { FormControlLabel } from "@material-ui/core";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import Label from "./LabelF";

const InputRadio = ({ setValor, valor, cab, error, setError, data }) => {
  const {
    // filtrosAAplicar,
    // setFiltrosAAplicar,
    radio_opciones,
    id_a,
    label,
    grid_span,
    opcionales_null,
    permite_null,
  } = cab;

  const handleRadio = (e) => {
    if (!e.target.value.trim()) {
      return setValor(undefined);
    }
    return setValor(e.target.value);
  };

  const styles = {
    gridColumn: grid_span,
  };

  return (
    <FormControl style={styles}>
      <Label
        label={label}
        opcionales_null={opcionales_null}
        permite_null={permite_null}
      />
      <div className="filtro_grid_radio_button">
        <RadioGroup value={valor ? valor : " "} onChange={handleRadio} row>
          {radio_opciones.map((item) => {
            return (
              <FormControlLabel
                key={item.label + "_" + item.value}
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            );
          })}
          <FormControlLabel
            value={" "}
            control={<Radio />}
            label={"Todas"}
            checked={!valor}
          />
        </RadioGroup>
      </div>
    </FormControl>
  );
};

export default InputRadio;
