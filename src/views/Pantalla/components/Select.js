import React from "react";

const Select = (props) => {
  const { nombre, opciones, onChange, value, def, id } = props;

  const isEmptyValue = (val) => val === undefined || val === null || val === "" || val === 0
  return (
    <select
      name={nombre}
      value={isEmptyValue(value) ? "" : value}
      onChange={onChange}
      defaultValue={isEmptyValue(def) ? "" : def}
      className="tarjeta_grid_item_select"
    >
      <option value="" disabled hidden>
        Seleccione una opción
      </option>
      {opciones.map((op) => {
        return (
          <option key={op.value} value={op.value} disabled={op.disabled}>
            {op.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
