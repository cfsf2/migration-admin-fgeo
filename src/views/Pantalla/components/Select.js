import React from "react";

const Select = (props) => {
  const { nombre, opciones, onChange, value, def, id } = props;

  const isEmptyValue = (val) => val === undefined || val === null || val === "" || val === 0

  const isValueValid = (val)=>{
    if(isEmptyValue(val)){
      return ""
    }
    if(opciones.filter(op=>op.value == val).length === 0){
      return ""
    }
    return val
  }
  return (
    <select
      name={nombre}
      value={isValueValid(value)}
      onChange={onChange}
      defaultValue={isValueValid(def)}
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
