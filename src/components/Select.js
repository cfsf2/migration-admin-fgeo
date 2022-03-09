import React from "react";

const Select = (props) => {
  const { nombre, opciones, onChange } = props;

  return (
    <select value={nombre} onChange={onChange}>
      {opciones.map((op) => {
        return <option value={op}>{op}</option>;
      })}
    </select>
  );
};

export default Select;
