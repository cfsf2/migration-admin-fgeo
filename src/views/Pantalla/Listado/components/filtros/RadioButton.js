import React from "react";
import { FormControlLabel } from "@material-ui/core";
import FormLabel from "@mui/material/FormLabel";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import Label from "./LabelF";
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";

const useStyles = makeStyles({
  myRadioButton: {
    "&.MuiButtonBase-root": {
      //backgroundColor: "red",
      padding: "6px",
    },
  },
});

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
        newState[id_a] = null
       
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

  const classes = useStyles();

  return (
    <FormControl style={styles}>
      <Label
        label={props.label}
        opcionales_null={props.opcionales_null}
        permite_null={props.permite_null}
      />
      <div className="filtro_grid_radio_button">
        <RadioGroup
          value={filtrosAAplicar[id_a] ?? ""}
          onChange={(e)=>handleRadio(e)}
          row
        >
          {radio_opciones.map((item) => {
            return (
              <FormControlLabel
                key={item.label + "_" + item.value}
                value={item.value}
                control={<Radio className={classes.myRadioButton} />}
                label={item.label}
              />
            );
          })}
          <FormControlLabel
            key="Todas"
            value={null}
            control={<Radio className={classes.myRadioButton} />}
            label={"Todas"}
            checked={filtrosAAplicar[id_a]===null || !filtrosAAplicar[id_a]}
          />
        </RadioGroup>
      </div>
    </FormControl>
  );
};

export default RadioF;
