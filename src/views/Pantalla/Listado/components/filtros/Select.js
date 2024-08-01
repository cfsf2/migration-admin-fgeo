import React from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import Label from "./LabelF";

export const SelectF = (props) => {
  const { id_a, filtrosAAplicar, setFiltrosAAplicar, opciones: op } = props;

  // const hasdefault = useMemo(
  //   () =>
  //     opciones?.find((opcion) => {
  //       return opcion.default === true;
  //     }),
  //   [opciones]
  // );

  const todasHabilitado = props.select_todas === "n";
  const opciones = todasHabilitado
    ? [].concat(op)
    : [{ value: " ", label: "Todas", default: true }].concat(op);

  return (
    <div>
      <FormControl fullWidth>
        <Label
          label={props.label}
          opcionales_null={props.opcionales_null}
          permite_null={props.permite_null}
        />
        <Select
          style={{ width: "95%", height: "49px" }}
          defaultValue={props.default}
          variant="standard"
          onChange={(e) => {
            setFiltrosAAplicar((prevState) => {
              return { ...prevState, [id_a]: e.target.value };
            });
          }}
          value={
            filtrosAAplicar[id_a] !== undefined
              ? isNaN(Number(filtrosAAplicar[id_a]))
                ? filtrosAAplicar[id_a]
                : Number(filtrosAAplicar[id_a])
              : ""
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
