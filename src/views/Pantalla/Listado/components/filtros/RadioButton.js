import React from "react";
import { FormControlLabel } from "@material-ui/core";
import FormLabel from "@mui/material/FormLabel";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import Label from "./LabelF";

const RadioF = (props) => {
  const {
    filtrosAAplicar,
    setFiltrosAAplicar,
    radio_opciones,
    id_a,
    label,
    grid_span,
  } = props;

  const handleRadio = (e) => {
    setFiltrosAAplicar((prevState) => {
      if (!e.target.value.trim()) {
        const newState = { ...prevState };
        delete newState[id_a];
        return newState;
      }
      return {
        ...prevState,
        [id_a]: e.target.value,
      };
    });
  };

  const styles = {
    gridColumn: grid_span,
  };

  return (
    <FormControl style={styles}>
      <Label
        label={props.label}
        opcionales_null={props.opcionales_null}
        permite_null={props.permite_null}
      />
      <div className="filtro_grid_radio_button">
        <RadioGroup
          value={filtrosAAplicar[id_a] ? filtrosAAplicar[id_a] : " "}
          onChange={handleRadio}
          row
        >
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
            checked={!filtrosAAplicar[id_a]}
          />
        </RadioGroup>
      </div>
    </FormControl>
  );
};

export default RadioF;
