import React, { useMemo } from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import PropTypes from "prop-types";
import Label from "./LabelF";

export const SelectInput = ({
  setValor,
  valor,
  cab,
  error,
  setError,
  data,
}) => {
  const {
    id,
    id_a,
    label,
    grid_span,
    opcionales_null,
    permite_null,
    margin_bottom_abm,
    width,
    opciones,
  } = cab;

  const styles = {
    gridColumn: grid_span,
  };

  const style_input_abm = {
    width: width,
    marginBottom: margin_bottom_abm,
  };

  return (
    <FormControl fullWidth>
      <Label
        label={label}
        opcionales_null={opcionales_null}
        permite_null={permite_null}
      />
      <Select
        // style={{ width }}
        defaultValue={cab.default}
        variant="standard"
        onChange={(e) => {
          setValor(e.target.value);

          setError((e) => {
            const ne = { ...e };
            ne[id_a] = false;

            return ne;
          });
        }}
        value={/^[0-9]/.test(valor) ? Number(valor) : valor}
        error={error[id_a]}
      >
        {opciones &&
          opciones.map((opcion) => (
            <MenuItem
              style={{
                width: "200px",
                textAlign: "center",
                fontSize: "0.8rem",
              }}
              value={opcion.value}
              key={opcion.value + opcion.label}
            >
              {opcion.default ? <em>{opcion.label}</em> : opcion.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
