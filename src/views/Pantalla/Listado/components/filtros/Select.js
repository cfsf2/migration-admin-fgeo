import React, { useMemo } from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import PropTypes from "prop-types";
import Label from "./LabelF";

export const SelectF = (props) => {
  const {
    label,
    id_a,
    filtrosAAplicar,
    setFiltrosAAplicar,
    opciones: op,
    className,
    width, //80%
    grid_span,
  } = props;

  // const hasdefault = useMemo(
  //   () =>
  //     opciones?.find((opcion) => {
  //       return opcion.default === true;
  //     }),
  //   [opciones]
  // );
  const opciones = [{ value: " ", label: "Todas", default: true }].concat(op);

  const styles = {
    gridColumn: grid_span,
  };

  return (
    <div style={styles}>
      <FormControl fullWidth>
        <Label
          label={props.label}
          opcionales_null={props.opcionales_null}
          permite_null={props.permite_null}
        />
        <Select
          style={{ width }}
          defaultValue={props.default}
          variant="standard"
          onChange={(e) => {
            setFiltrosAAplicar((prevState) => {
              return { ...prevState, [id_a]: e.target.value };
            });
          }}
          value={Number(filtrosAAplicar[id_a])}
        >
          {/* {hasdefault ? null : (
            <MenuItem
              style={{ width: "100px", textAlign: "left" }}
              value=" "
              key="todas"
            >
              <em>Todas</em>
            </MenuItem>
          )} */}
          {opciones &&
            opciones.map((opcion) => (
              <MenuItem
                style={{ width: "200px", textAlign: "center" }}
                value={opcion.value}
                key={opcion.value + opcion.label}
              >
                {opcion.default ? <em>{opcion.label}</em> : opcion.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectF;

SelectF.propTypes = {
  label: PropTypes.string.isRequired,
  campo: PropTypes.string.isRequired,
  filter: PropTypes.shape({
    habilitado: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    instituciones: PropTypes.string,
    vigencia: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    titulo: PropTypes.string,
  }).isRequired,
  setFilter: PropTypes.func.isRequired,
  opciones: PropTypes.shape({
    nombre: PropTypes.string,
    value: PropTypes.any,
    default: PropTypes.bool,
  }),
};