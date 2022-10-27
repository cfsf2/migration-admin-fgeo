import React, { useMemo } from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import PropTypes from "prop-types";
import Label from "./LabelF";
import { height } from "@mui/system";

export const SelectF = (props) => {
  const { id_a, filtrosAAplicar, setFiltrosAAplicar, opciones: op } = props;

  // const hasdefault = useMemo(
  //   () =>
  //     opciones?.find((opcion) => {
  //       return opcion.default === true;
  //     }),
  //   [opciones]
  // );
  const opciones = [{ value: " ", label: "Todas", default: true }].concat(op);

  return (
    <div>
      <FormControl fullWidth>
        <Label
          label={props.label}
          opcionales_null={props.opcionales_null}
          permite_null={props.permite_null}
        />
        <Select
          style={{ width: "100%", marginTop: "24px" }}
          defaultValue={props.default}
          variant="standard"
          onChange={(e) => {
            setFiltrosAAplicar((prevState) => {
              return { ...prevState, [id_a]: e.target.value };
            });
          }}
          value={
            isNaN(Number(filtrosAAplicar[id_a]))
              ? filtrosAAplicar[id_a]
              : Number(filtrosAAplicar[id_a])
          }
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
                style={{ width: "100%", textAlign: "center" }}
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
