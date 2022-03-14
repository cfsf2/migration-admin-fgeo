import React from "react";

const Select = (props) => {
  const { nombre, opciones, onChange, value } = props;

  return (
    <select name={nombre} value={value} onChange={onChange}>
      {opciones.map((op) => {
        return <option value={op.value}>{op.nombre}</option>;
      })}
    </select>
  );
};

export default Select;
