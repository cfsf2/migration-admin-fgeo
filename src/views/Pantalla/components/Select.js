import React from "react";

const Select = (props) => {
  const { nombre, opciones, onChange, value, def, id } = props;

  return (
    <select
      name={nombre}
      value={value ?? def}
      onChange={onChange}
      defaultValue={def}
      className="tarjeta_grid_item_select"
    >
      {opciones.map((op) => {
        return (
          <option value={op.value} disabled={op.disabled}>
            {op.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
