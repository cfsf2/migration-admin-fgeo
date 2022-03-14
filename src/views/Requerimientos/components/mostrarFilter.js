import React from "react";
import { Select, MenuItem, InputLabel } from "@mui/material";
import PropTypes from "prop-types";
import "./listado.scss";

export const MostrarFilter = (props) => {
  const { label, campo, filtroActivo, setFilter, opciones, className } = props;

  const hasdefault = opciones.find((opcion) => {
    return opcion.default === true;
  });

  return (
    <div
      style={{ position: "relative" }}
      className={`mostrarFilter ${className}`}
    >
      <InputLabel
        style={{ position: "absolute", top: "-16px" }}
        id="mostrarFilter"
      >
        {label}
      </InputLabel>
      <Select
        style={{ width: "200px" }}
        defaultValue={
          hasdefault ? opciones.find((opcion) => opcion.default).value : "todas"
        }
        variant="standard"
        onChange={(e) => {
          setFilter({ ...filtroActivo, [campo]: e.target.value });
        }}
        labelId="mostrarFilter"
        className="mostrarFilter_select"
        value={filtroActivo[campo]}
      >
        {hasdefault ? null : (
          <MenuItem
            style={{ width: "100%", textAlign: "left" }}
            value="todas"
            key="todas"
          >
            <em>Todas</em>
          </MenuItem>
        )}
        {opciones.map((opcion) => (
          <MenuItem
            style={{ width: "100%", textAlign: "left" }}
            value={opcion.value}
            key={opcion.value + opcion.nombre}
          >
            {opcion.default ? <em>{opcion.nombre}</em> : opcion.nombre}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

MostrarFilter.propTypes = {
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
