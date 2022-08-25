import React from "react";

const Select = (props) => {
  const { nombre, opciones, onChange, value, def } = props;

  return (
    <select
      name={nombre}
      value={value}
      onChange={onChange}
      defaultValue={def}
      className="tarjeta_grid_item_select"
      style={{ width: "100%", textAlign: "center" }}
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
